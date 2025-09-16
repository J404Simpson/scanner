document.addEventListener('DOMContentLoaded', () => {
  const videoElement = document.getElementById('video');
  const output = document.getElementById('output');
  const scanningView = document.getElementById('scanningView');
  const tableView = document.getElementById('tableView');
  const confirmationView = document.getElementById('confirmationView');
  const tableSection = document.getElementById('tableSection');
  const verifyAccountBtn = document.getElementById('verifyAccountBtn');
  const startBtn = document.getElementById('startBtn');
  // const switchCameraBtn = document.getElementById('switchCameraBtn');
  const cancelScanBtn = document.getElementById('cancelScanBtn');
  const scanNextBtn = document.getElementById('scanNextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const confirmSubmitBtn = document.getElementById('confirmSubmitBtn');
  const cancelSubmitBtn = document.getElementById('cancelSubmitBtn');
  const itemTableBody = document.querySelector('#itemTable tbody');

  const hints = new Map();
  const formats = [
    ZXing.BarcodeFormat.CODE_128,
    ZXing.BarcodeFormat.DATA_MATRIX
  ];

  hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, formats);

  const codeReader = new ZXing.BrowserMultiFormatReader(hints);

  const scannedCodes = [];

  let currentDeviceId = null;
  let lastScannedCode = null;
  let confirmedAccount = null;
  let confirmedAccountName = null;
  let scanCooldown = false;
  let consignmentItems = [];
  let devices = [];
  let currentDeviceIndex = 0;

  updateViewState();
  initCameras();

  async function verifyAccountNumber() {
    const input = document.getElementById('accountInput');
    const status = document.getElementById('accountStatus');
    const accountNumber = input.value.trim();

    if (!accountNumber) {
      status.textContent = '⚠ Please enter an account number.';
      status.style.color = 'red';
      return;
    }

    status.textContent = '🔍 Looking up account...';
    status.style.color = 'blue';

    try {
      const res = await fetch(
        `https://inventoryscannerapi-e5e2bfbhc2dkfsb6.germanywestcentral-01.azurewebsites.net/api/account?number=${encodeURIComponent(accountNumber)}`
      );
      const data = await res.json();
      console.log("📦 Account API response:", data);

      // ✅ Handle 404 (Account not found)
      if (res.status === 404) {
        status.textContent = `❌ No account found for ${accountNumber}`;
        status.style.color = 'red';
        return;
      }

      // ✅ Handle 422 (Account exists but missing data)
      if (res.status === 422) {
        status.textContent = `⚠ Account found but missing required fields. Please contact support.`;
        status.style.color = 'darkorange';
        return;
      }

      // ✅ Handle server errors
      if (res.status >= 500) {
        status.textContent = '❌ Server error. Please try again later.';
        status.style.color = 'red';
        return;
      }

      // ✅ Success → Display confirmation buttons
      status.innerHTML = `
        ✅ Found: ${data.name} <br/>📦 Warehouse: ${data.warehouseCode} <br/>
        Is this correct? 
        <button id="confirmAccountBtn" class="bg-green-600 text-white px-3 py-1 rounded ml-2">Yes</button>
        <button id="rejectAccountBtn" class="bg-red-600 text-white px-3 py-1 rounded ml-2">No</button>
      `;
      status.style.color = 'green';

      // ✅ Attach event listeners AFTER innerHTML is updated
      const confirmBtn = status.querySelector('#confirmAccountBtn');
      const rejectBtn = status.querySelector('#rejectAccountBtn');

      confirmBtn.addEventListener('click', async () => {
        confirmedAccount = accountNumber;
        confirmedAccountName = data.name;
        confirmedWarehouseCode = data.warehouseCode;

        // Show loading while fetching items
        output.textContent = '📦 Loading consignment items...';

        try {
          await fetchConsignmentItems(data.warehouseCode);

          // After fetch completes, populate the table
          populateConsignmentTable();

          // Hide account section and show table view
          document.getElementById('accountSection').classList.add('hidden');
          document.getElementById('tableView').classList.remove('hidden');

          output.textContent = `✅ Confirmed: ${data.name} (Warehouse: ${data.warehouseCode})`;
          updateViewState();
        } catch (err) {
          console.error("❌ Error fetching consignment items:", err);
          alert("Failed to load consignment data. Please try again.");
        }

      });

      rejectBtn.addEventListener('click', () => {
        confirmedAccount = null;
        confirmedAccountName = null;
        confirmedWarehouseCode = null;
        input.value = '';
        status.textContent = '⚠ Please enter the correct account number.';
        status.style.color = 'darkorange';
      });

    } catch (err) {
        console.error('❌ Network/Server Error:', err);
        status.textContent = '❌ Unable to connect. Please try again.';
        status.style.color = 'red';
    }
  }

  async function fetchConsignmentItems(warehouseCode) {
    try {
      const res = await fetch(
        `https://inventoryscannerapi-e5e2bfbhc2dkfsb6.germanywestcentral-01.azurewebsites.net/api/items?warehouseCode=${encodeURIComponent(warehouseCode)}`
      );

      if (!res.ok) {
        throw new Error(`Unable to fetch items for ${warehouseCode}, status ${res.status}`);
        // console.warn(`⚠ Unable to fetch items for ${warehouseCode}`);
        // consignmentItems = [];
        // return;
      }

      const data = await res.json();
      console.log("📦 Raw consignment API data:", data);

      // Check if the API returns { items: [...] } or just [...]
      consignmentItems = Array.isArray(data)
      ? data
      : (data.items || []);
      console.log("✅ Processed consignment items:", consignmentItems);
    } catch (err) {
      console.error("❌ Failed to fetch consignment items:", err);
      consignmentItems = [];
      throw err;
    }
  }

  function populateConsignmentTable() {
    // Clear existing table
    itemTableBody.innerHTML = '';

    // Add each consignment item as a row
    consignmentItems.forEach((item, index) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td data-label="#">${index + 1}</td>
        <td data-label="Lot Number">${item.cr5bd_lotnumber || ''}</td>
        <td data-label="Expiry Date">${formatDate(item.cr5bd_expirydate)}</td>
        <td data-label="Quantity in Stock">${item.cr5bd_quantity || 0}</td>
        <td data-label="Count">0</td>
      `;

      itemTableBody.appendChild(row);
    });
  }

  function updateViewState() {
    const buttonSection = document.getElementById('buttonSection');
    const hasScans = scannedCodes.length > 0;

    // Show Start button only if no scans exist and account is confirmed
    startBtn.classList.toggle('hidden', hasScans || !confirmedAccount);
    startBtn.disabled = !confirmedAccount;

    // Show Scan Next only if there are scans
    scanNextBtn.classList.toggle('invisible', !hasScans);
    scanNextBtn.disabled = !hasScans;

    // Enable Submit only if there are scans
    submitBtn.disabled = !hasScans;

    // Show/hide submit button
    buttonSection.classList.toggle('hidden', !hasScans);
  }

  function startScan() {
    scanningView.classList.remove('hidden');
    tableView.classList.add('hidden');

    output.textContent = '📡 Scanning...';
    scanNextBtn.disabled = true;

    codeReader.reset();
    lastScannedCode = null;

    const deviceId = devices[currentDeviceIndex].deviceId;

    codeReader.decodeFromVideoDevice(deviceId, videoElement, (result, err) => {
        if (result && !scanCooldown) {
            scanCooldown = true;
            setTimeout(() => (scanCooldown = false), 1000); // 1-second lockout

            let code = result.getText().replace(/[\x00-\x1F]/g, '');
            const format = result.getBarcodeFormat();

            if (format === ZXing.BarcodeFormat.CODE_128 && !isLikelyGS1(code)) {
                output.textContent = `⚠️ Skipped non-GS1 CODE_128: ${code}`;
                scanNextBtn.disabled = false;
                return;
            }

            const entry = { code, format, count: 1 };
            scannedCodes.push(entry);
            addToTable(scannedCodes.length, entry);

            lastScannedCode = code;
            scanningView.classList.add('hidden');
            tableView.classList.remove('hidden');
            scanNextBtn.disabled = false;

            updateViewState();
        } else if (err && !(err instanceof ZXing.NotFoundException)) {
            output.textContent = '⚠️ Scan error.';
            console.error('Scan error:', err);
        }
    });
  }

  async function initCameras() {
    devices = await codeReader.listVideoInputDevices();
    if (devices.length === 0) {
      output.textContent = '❌ No camera found.';
      return;
    }
    // Start with the rear-facing camera if available
    const backCamIndex = devices.findIndex(d =>
      d.label.toLowerCase().includes('back') ||
      d.label.toLowerCase().includes('rear') ||
      d.label.toLowerCase().includes('environment')
    );
    currentDeviceIndex = backCamIndex !== -1 ? backCamIndex : 0;
  }

  function addToTable(index, entry) {
    const parsed = isLikelyGS1(entry.code)
      ? parseGS1(entry.code, entry.format)
      : { code: entry.code };

    const scannedLot = parsed.lot || '';

    // 🔍 Check if lot already exists in the items table
    const existingRow = Array.from(itemTableBody.querySelectorAll('tr'))
      .find(row => row.cells[1]?.textContent.trim().toUpperCase() === scannedLot.trim(). toUpperCase());

    if (existingRow) {
      // ✅ Increment the Count column (5th column = index 4)
      const countCell = existingRow.cells[4];
      countCell.textContent = Number(countCell.textContent) + 1;
      output.textContent = `➕ Incremented count for Lot #${scannedLot}`;
    } else {
      // ❌ No existing row → Add a new one
      const matchedItem = consignmentItems.find(item =>
        item.cr5bd_lotnumber &&
        item.cr5bd_lotnumber.trim().toUpperCase() === scannedLot.trim().toUpperCase()
      );

      const quantityInStock = matchedItem ? Number(matchedItem.cr5bd_quantity) : 0;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td data-label="#">${itemTableBody.children.length + 1}</td>
        <td data-label="Lot Number">${scannedLot}</td>
        <td data-label="Expiry Date">${parsed.expiry || ''}</td>
        <td data-label="Quantity in Stock">${quantityInStock}</td>
        <td data-label="Count">1</td>
      `;

      itemTableBody.appendChild(row);

      output.textContent = `✅ Added new lot #${scannedLot}`;
    }

    output.style.color = 'green';
  }

  function parseGS1(code, format) {
    const result = {
      code: code.replace(/[\x00-\x1F]/g, '')  // Check again for control characters like FNC1
    };

    // If the format is CODE_128 and it's a GS1 format, parse with AI logic
    if (format === ZXing.BarcodeFormat.CODE_128) {
      // Replace non-printable ASCII characters (usually FNC1 = ASCII 29)
      const fnc1 = String.fromCharCode(29);

      let i = 0;
      while (i < code.length) {
        const ai2 = code.substr(i, 2);
        const ai3 = code.substr(i, 3);
        let ai = null;

        // Try 3-digit AI first
        if (['240', '241'].includes(ai3)) {
          ai = ai3;
          i += 3;
        } else if (['00', '01', '10', '11', '17', '21'].includes(ai2)) {
          ai = ai2;
          i += 2;
        } else {
          console.warn('Unknown AI at position', i, code.substr(i, 4));
          break;
        }

        let value;
        if (['00'].includes(ai)) {
          value = code.substr(i, 18); i += 18;
        } else if (['01'].includes(ai)) {
          value = code.substr(i, 14); i += 14;
        } else if (['17', '11'].includes(ai)) {
          value = code.substr(i, 6); i += 6;
        } else if (['10', '21', '240', '241'].includes(ai)) {
          // Variable length, ends with FNC1 or end of string
          let end = code.indexOf(fnc1, i);
          if (end === -1) end = code.length;
          value = code.substring(i, end);
          i = end + 1; // skip past separator
        } else {
          console.warn('Unhandled AI:', ai);
          break;
        }

        switch (ai) {
          case '01': result.device = value; break;
          case '17': result.expiry = `20${value.slice(0, 2)}-${value.slice(2, 4)}-${value.slice(4, 6)}`; break;
          case '11': result.produced = `20${value.slice(0, 2)}-${value.slice(2, 4)}-${value.slice(4, 6)}`; break;
          case '10': result.lot = value; break;
          default:
            result[`AI_${ai}`] = value;
        }
      }
    }

    // If the format is DATA_MATRIX, parse by fixed slices (your logic seems fine)
    else if (format === ZXing.BarcodeFormat.DATA_MATRIX) {
      if (code.charCodeAt(0) < 32) {
        code = code.slice(1);
      }

      result.device = code.slice(0, 16);
      result.expiry = `20${code.slice(18, 20)}-${code.slice(20, 22)}-${code.slice(22, 24)}`;
      result.produced = `20${code.slice(26, 28)}-${code.slice(28, 30)}-${code.slice(30, 32)}`;
      result.lot = code.slice(34, 44);
    }

    return result;
  }

  // Check code is GS1
  function isLikelyGS1(code) {
    return /^01\d{14}/.test(code);
  }

  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // ✅ gives "YYYY-MM-DD"
  }

  verifyAccountBtn.addEventListener('click', verifyAccountNumber);

  startBtn.addEventListener('click', () => {
    if (!confirmedAccount) {
      output.textContent = '⚠️ Please confirm the account before scanning.';
      return;
    }

    // Hide the table view
    document.getElementById('tableView').classList.add('hidden');

    // Show the scanning view
    document.getElementById('scanningView').classList.remove('hidden');

    // Update status
    output.textContent = '📷 Initializing camera...';

    // Start scanning
    codeReader.listVideoInputDevices().then(devices => {
      if (devices.length === 0) {
        output.textContent = '❌ No camera found.';
        return;
      }
      currentDeviceId = devices[0].deviceId;
      startScan();
    }).catch(err => {
      output.textContent = `❌ Camera error: ${err.message || err}`;
      console.error(err);
    });
  });
  
  // switchCameraBtn.addEventListener('click', () => {
  //   if (!devices.length) return;

  //   // Move to next camera
  //   currentDeviceIndex = (currentDeviceIndex + 1) % devices.length;

  //   // Update the currentDeviceId
  //   currentDeviceId = devices[currentDeviceIndex].deviceId;

  //   // Restart scanning with new camera
  //   startScan();
  // });

  cancelScanBtn.addEventListener('click', () => {
    codeReader.reset();
    scanningView.classList.add('hidden');
    tableView.classList.remove('hidden');
    output.textContent = '✅ Scan cancelled.';
    scanCooldown = false;
    updateViewState();
  });

  scanNextBtn.addEventListener('click', () => startScan());

  submitBtn.addEventListener('click', () => {
    if (!confirmedAccount) {
      output.textContent = '⚠ Missing account';
      return;
    }

    const rows = Array.from(itemTableBody.querySelectorAll('tr'));
    const codes = rows.map(row => ({
      lot: row.querySelector('[data-label="Lot Number"]').textContent.trim(),
      expiry: row.querySelector('[data-label="Expiry Date"]').textContent.trim(),
      count: parseInt(row.querySelector('[data-label="Count"]').textContent.trim(), 10) || 0,
      quantityInStock: parseInt(row.querySelector('[data-label="Quantity in Stock"]').textContent.trim(), 10) || 0
    }));

    if (codes.length === 0) {
      output.textContent = '⚠ No scanned items to submit';
      return;
    }

    // Store payload for later submission
    window.pendingSubmission = {
      account: confirmedAccount,
      accountName: confirmedAccountName,
      codes
    };

    // Hide main views, show confirmation
    tableSection.classList.add('hidden');
    tableView.classList.add('hidden');
    scanningView.classList.add('hidden');
    confirmationView.classList.remove('hidden');

    output.textContent = ''; // Clear previous messages
  });

  confirmSubmitBtn.addEventListener('click', async () => {
    if (!window.pendingSubmission) return;

    // Hide everything
    confirmationView.classList.add('hidden');
    tableView.classList.remove('hidden');
    scanningView.classList.add('hidden');
    document.getElementById('accountSection').classList.add('hidden');

    // Show submitting message
    output.textContent = '📤 Submitting...';
    output.classList.remove('text-gray-700'); // optional: make it more prominent
    output.classList.add('text-green-600', 'font-semibold', 'text-center', 'text-lg');

    try {
      const res = await fetch(
        'https://inventoryscannerapi-e5e2bfbhc2dkfsb6.germanywestcentral-01.azurewebsites.net/api/submit',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(window.pendingSubmission)
        }
      );

      const data = await res.json();

      if (res.ok) {
        // ✅ Only show confirmation message
        output.textContent = '✅ Table submitted successfully!';
        
        // Clear all data
        itemTableBody.innerHTML = '';
        scannedCodes.length = 0;
        confirmedAccount = null;
        confirmedAccountName = null;
        confirmedWarehouseCode = null;
        window.pendingSubmission = null;
      } else {
        output.textContent = '❌ Failed to submit table';
        console.error('Flow error:', data);
      }
    } catch (err) {
      output.textContent = '❌ Network error triggering flow';
      console.error(err);
    }
  });

  cancelSubmitBtn.addEventListener('click', () => {
    confirmationView.classList.add('hidden');
    tableView.classList.remove('hidden');
    output.textContent = '⚠ Submission cancelled';
    window.pendingSubmission = null;
  });

});