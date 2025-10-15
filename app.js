document.addEventListener('DOMContentLoaded', async () => {
  const videoElement = document.getElementById('video');
  const output = document.getElementById('output');
  const scanningView = document.getElementById('scanningView');
  const tableView = document.getElementById('tableView');
  const confirmationView = document.getElementById('confirmationView');
  const submissionResultView = document.getElementById('submissionResultView');
  const submissionMessage = document.getElementById('submissionMessage');
  const accountSection = document.getElementById('accountSection');
  const tableSection = document.getElementById('tableSection');
  const buttonSection = document.getElementById('buttonSection');
  const verifyAccountBtn = document.getElementById('verifyAccountBtn');
  const startBtn = document.getElementById('startBtn');
  const cancelScanBtn = document.getElementById('cancelScanBtn');
  const scanNextBtn = document.getElementById('scanNextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const confirmSubmitBtn = document.getElementById('confirmSubmitBtn');
  const cancelSubmitBtn = document.getElementById('cancelSubmitBtn');
  const itemTableBody = document.querySelector('#itemTable tbody');

  const licenseKey =
  "fS1e2s+IvkOlukoEWUQbnKK89hDDfW" +
  "Jp/x1hDCB1mKDzf0CDjl+9/uSSNCsj" +
  "C4hwaas4foFNvxvJKmFFpgkTbVzDrn" +
  "XXhSRcsTSj4mC2F+2oJS9Y6oGG2muF" +
  "L5R8j/Ofd1LYABfJkXqI+vp/RoUqzW" +
  "GjaUVnRRyfnEoD1qg2UacEdLz8bGFo" +
  "wNIBjWvwOu/KWMnnggSSmxDClvoRKL" +
  "0QlTIDC3CYH/SG4/e1vNGH7uQem3pN" +
  "HTSRKE3tD9ptadrXJ5SQN48F2cmZ9x" +
  "pyjjK5BLZ310QP9kyMxHa0QTiRp0F3" +
  "IdtaFQ3HBGdt+yDFxTA/BZt0vUCzfe" +
  "57wDKjseB0mA==\nU2NhbmJvdFNESw" +
  "psb2NhbGhvc3R8c2Nhbm5lci52ZXJ5" +
  "YW5tZWQuY29tfHZlcnlhbm1lZC5jb2" +
  "0KMTc2Mjk5MTk5OQo1MTIKOA==\n";

  const scannedCodes = [];
  let scanbotSDK = null;
  let barcodeScanner = null;

  let barcodeScannerController = null;

  let currentDeviceId = null;
  let lastScannedCode = null;
  let confirmedAccount = null;
  let confirmedAccountName = null;
  let confirmedWarehouseCode = null;
  let scanCooldown = false;
  let consignmentItems = [];

  // Initialize Scanbot SDK
  async function initScanbot() {
    try {
      scanbotSDK = await ScanbotSDK.initialize({
        licenseKey: licenseKey,
        enginePath: '/wasm/',
        onInitialize: () => console.log('Scanbot SDK initialized!'),
        onInitializeError: (error) => console.error('Init failed:', error)
      });
      console.log('Scanbot SDK ready:', scanbotSDK.isReady);
    } catch (err) {
      console.error('Failed to initialize Scanbot SDK:', err);
      output.textContent = 'Failed to initialize scanner.';
    }
  }

  await initScanbot();
  updateViewState();

  async function verifyAccountNumber() {
    const input = document.getElementById('accountInput');
    const status = document.getElementById('accountStatus');
    const accountNumber = input.value.trim();

    if (!accountNumber) {
      status.textContent = 'Please enter an account number.';
      status.style.color = 'red';
      return;
    }

    status.textContent = 'Looking up account...';
    status.style.color = 'blue';

    try {
      const res = await fetch(
        `https://inventoryscannerapi-e5e2bfbhc2dkfsb6.germanywestcentral-01.azurewebsites.net/api/account?number=${encodeURIComponent(accountNumber)}`
      );
      const data = await res.json();

      if (res.status === 404) {
        status.textContent = `No account found for ${accountNumber}`;
        status.style.color = 'red';
        return;
      }
      if (res.status === 422) {
        status.textContent = `Account found but missing required fields. Please contact support.`;
        status.style.color = 'darkorange';
        return;
      }
      if (res.status >= 500) {
        status.textContent = 'Server error. Please try again later.';
        status.style.color = 'red';
        return;
      }

      status.innerHTML = `
        Found: ${data.name} <br/>Warehouse: ${data.warehouseCode} <br/>
        Is this correct? 
        <button id="confirmAccountBtn" class="bg-green-600 text-white px-3 py-1 rounded ml-2">Yes</button>
        <button id="rejectAccountBtn" class="bg-red-600 text-white px-3 py-1 rounded ml-2">No</button>
      `;
      status.style.color = 'green';

      const confirmBtn = status.querySelector('#confirmAccountBtn');
      const rejectBtn = status.querySelector('#rejectAccountBtn');

      confirmBtn.addEventListener('click', async () => {
        confirmedAccount = accountNumber;
        confirmedAccountName = data.name;
        confirmedWarehouseCode = data.warehouseCode;

        output.textContent = 'Loading consignment items...';

        try {
          await fetchConsignmentItems(data.warehouseCode);
          populateConsignmentTable();

          accountSection.classList.add('hidden');
          tableView.classList.remove('hidden');

          output.textContent = `Confirmed: ${data.name} (Warehouse: ${data.warehouseCode})`;
          updateViewState();
        } catch (err) {
          console.error("Error fetching consignment items:", err);
          alert("Failed to load consignment data. Please try again.");
        }
      });

      rejectBtn.addEventListener('click', () => {
        confirmedAccount = null;
        confirmedAccountName = null;
        confirmedWarehouseCode = null;
        input.value = '';
        status.textContent = 'Please enter the correct account number.';
        status.style.color = 'darkorange';
      });

    } catch (err) {
      console.error('Network/Server Error:', err);
      status.textContent = 'Unable to connect. Please try again.';
      status.style.color = 'red';
    }
  }

  async function fetchConsignmentItems(warehouseCode) {
    const res = await fetch(
      `https://inventoryscannerapi-e5e2bfbhc2dkfsb6.germanywestcentral-01.azurewebsites.net/api/items?warehouseCode=${encodeURIComponent(warehouseCode)}`
    );
    if (!res.ok) throw new Error(`Unable to fetch items: ${res.status}`);
    const data = await res.json();
    consignmentItems = Array.isArray(data) ? data : (data.items || []);
  }

  function populateConsignmentTable() {
    itemTableBody.innerHTML = '';
    consignmentItems.forEach((item, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td data-label="#">${index + 1}</td>
        <td data-label="Lot Number">${item.cr5bd_lotnumber || ''}</td>
        <td data-label="Expiry Date">${formatDate(item.cr5bd_expirydate)}</td>
        <td data-label="Quantity">${item.cr5bd_quantity || 0}</td>
        <td data-label="Count">0</td>
      `;
      itemTableBody.appendChild(row);
    });
  }

  function updateViewState() {
    const hasScans = scannedCodes.length > 0;
    startBtn.classList.toggle('hidden', hasScans || !confirmedAccount);
    startBtn.disabled = !confirmedAccount;
    scanNextBtn.classList.toggle('invisible', !hasScans);
    scanNextBtn.disabled = !hasScans;
    submitBtn.disabled = !hasScans;
    buttonSection.classList.toggle('hidden', !hasScans);
  }

  async function startScan() {
    try {
      if (!scanbotSDK) {
        output.textContent = 'Scanbot SDK not ready.';
        return;
      }

      scanningView.classList.remove('hidden');
      tableView.classList.add('hidden');
      output.textContent = 'Starting Scanbot camera...';
      scanNextBtn.disabled = true;

      if (barcodeScannerController) {
        await barcodeScannerController.close();
        barcodeScannerController = null;
      }

      barcodeScannerController = new BarcodeScannerController();

      barcodeScannerController.props.container = videoElement;

      barcodeScannerController.props.barcodeFormatConfigurations = [
        new ScanbotSDK.Config.BarcodeFormatCommonConfiguration({
          formats: ['CODE_128', 'DATA_MATRIX'],
        }),
      ];

      barcodeScannerController.props.onDetected = async (result) => {
        console.log('SDK onDetected fired:', result);
        if (result.barcodes && result.barcodes.length > 0) {
          await onBarcodeDetected(result.barcodes);
        }
      };

      await barcodeScannerController.show();
      console.log('Barcode scanner controller ready:', barcodeScannerController);

    } catch (err) {
      console.error('Error while starting scanner:', err);
      output.textContent = 'Unable to start scanner. See console.';
      scanningView.classList.add('hidden');
      tableView.classList.remove('hidden');
      scanNextBtn.disabled = false;
    }
  }

  async function onBarcodeDetected(result) {
    console.log("Raw detection result:", result);
    if (!result || result.length === 0) {
      console.log('No barcodes in result:', result);
      return;
    }
    if (scanCooldown) {
      console.log('Scan cooldown, ignoring detection');
      return;
    }

    scanCooldown = true;
    setTimeout(() => (scanCooldown = false), 1000);

    const barcode = result[0];
    const code = (barcode.text || '').trim();
    const format = barcode.format || barcode.symbology || '';

    console.log('Detected barcode:', { code, format, raw: barcode });

    if (!code) {
      output.textContent = 'Empty barcode read, skipping.';
      scanNextBtn.disabled = false;
      return;
    }

    // if (format === 'CODE_128' && !isLikelyGS1(code)) {
    //   output.textContent = `Skipped non-GS1 CODE_128: ${code}`;
    //   scanNextBtn.disabled = false;
    //   return;
    // }

    const entry = { code, format, count: 1 };
    scannedCodes.push(entry);
    addToTable(scannedCodes.length, entry);

    lastScannedCode = code;
    scanningView.classList.add('hidden');
    tableView.classList.remove('hidden');
    scanNextBtn.disabled = false;
    updateViewState();

    // try {
    //   if (barcodeScanner) {
    //     await barcodeScanner.dispose();
    //     barcodeScanner = null;
    //   }
    // } catch (e) {
    //   console.warn('Error disposing scanner after detection:', e);
    //   barcodeScanner = null;
    // }
  }

  function addToTable(index, entry) {
    const parsed = isLikelyGS1(entry.code)
      ? parseGS1(entry.code, entry.format)
      : { code: entry.code };

    const scannedLot = parsed.lot || '';

    const existingRow = Array.from(itemTableBody.querySelectorAll('tr'))
      .find(row => row.cells[1]?.textContent.trim().toUpperCase() === scannedLot.trim().toUpperCase());

    if (existingRow) {
      const countCell = existingRow.cells[4];
      countCell.textContent = Number(countCell.textContent) + 1;
      output.textContent = `Incremented count for Lot #${scannedLot}`;
    } else {
      const matchedItem = consignmentItems.find(item =>
        item.cr5bd_lotnumber &&
        item.cr5bd_lotnumber.trim().toUpperCase() === scannedLot.trim().toUpperCase()
      );
      const quantity = matchedItem ? Number(matchedItem.cr5bd_quantity) : 0;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td data-label="#">${itemTableBody.children.length + 1}</td>
        <td data-label="Lot Number">${scannedLot}</td>
        <td data-label="Expiry Date">${parsed.expiry || ''}</td>
        <td data-label="Quantity">${quantity}</td>
        <td data-label="Count">1</td>
      `;
      itemTableBody.appendChild(row);

      output.textContent = `Added new lot #${scannedLot}`;
    }
    output.style.color = 'green';
  }

  function parseGS1(code, format) {
    const result = { code: code.replace(/[\x00-\x1F]/g, '') };
    if (format === 'CODE_128') {
      const fnc1 = String.fromCharCode(29);
      let i = 0;
      while (i < code.length) {
        const ai2 = code.substr(i, 2);
        const ai3 = code.substr(i, 3);
        let ai = null;
        if (['240', '241'].includes(ai3)) { ai = ai3; i += 3; }
        else if (['00', '01', '10', '11', '17', '21'].includes(ai2)) { ai = ai2; i += 2; }
        else break;
        let value;
        if (['00'].includes(ai)) { value = code.substr(i, 18); i += 18; }
        else if (['01'].includes(ai)) { value = code.substr(i, 14); i += 14; }
        else if (['17', '11'].includes(ai)) { value = code.substr(i, 6); i += 6; }
        else if (['10', '21', '240', '241'].includes(ai)) {
          let end = code.indexOf(fnc1, i);
          if (end === -1) end = code.length;
          value = code.substring(i, end);
          i = end + 1;
        } else break;
        switch (ai) {
          case '01': result.device = value; break;
          case '17': result.expiry = `20${value.slice(0,2)}-${value.slice(2,4)}-${value.slice(4,6)}`; break;
          case '11': result.produced = `20${value.slice(0,2)}-${value.slice(2,4)}-${value.slice(4,6)}`; break;
          case '10': result.lot = value; break;
          default: result[`AI_${ai}`] = value;
        }
      }
    } else if (format === 'DATA_MATRIX') {
      if (code.charCodeAt(0) < 32) code = code.slice(1);
      result.device = code.slice(0, 16);
      result.expiry = `20${code.slice(18, 20)}-${code.slice(20, 22)}-${code.slice(22, 24)}`;
      result.produced = `20${code.slice(26, 28)}-${code.slice(28, 30)}-${code.slice(30, 32)}`;
      result.lot = code.slice(34, 44);
    }
    return result;
  }

  function isLikelyGS1(code) { return /^01\d{14}/.test(code); }

  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  verifyAccountBtn.addEventListener('click', verifyAccountNumber);

  startBtn.addEventListener('click', async () => {
    if (!confirmedAccount) {
      output.textContent = 'Please confirm the account before scanning.';
      return;
    }
    tableView.classList.add('hidden');
    scanningView.classList.remove('hidden');
    output.textContent = '📷 Initializing camera...';
    await startScan();
  });

  cancelScanBtn.addEventListener('click', async () => {
    if (barcodeScanner) await barcodeScanner.dispose();
    scanningView.classList.add('hidden');
    tableView.classList.remove('hidden');
    output.textContent = 'Scan cancelled.';
    scanCooldown = false;
    updateViewState();
  });

  scanNextBtn.addEventListener('click', () => startScan());

  submitBtn.addEventListener('click', () => {
    if (!confirmedAccount) {
      output.textContent = 'Missing account';
      return;
    }

    const rows = Array.from(itemTableBody.querySelectorAll('tr'));
    const codes = rows.map(row => ({
      lot: row.querySelector('[data-label="Lot Number"]').textContent.trim(),
      expiry: row.querySelector('[data-label="Expiry Date"]').textContent.trim(),
      count: parseInt(row.querySelector('[data-label="Count"]').textContent.trim(), 10) || 0,
      quantity: parseInt(row.querySelector('[data-label="Quantity"]').textContent.trim(), 10) || 0
    }));

    if (codes.length === 0) {
      output.textContent = 'No scanned items to submit';
      return;
    }

    window.pendingSubmission = {
      account: confirmedAccount,
      accountName: confirmedAccountName,
      codes
    };

    tableSection.classList.add('hidden');
    tableView.classList.add('hidden');
    scanningView.classList.add('hidden');
    confirmationView.classList.remove('hidden');
    output.textContent = '';
  });

  confirmSubmitBtn.addEventListener('click', async () => {
    if (!window.pendingSubmission) return;
    confirmationView.classList.add('hidden');
    tableView.classList.add('hidden');
    scanningView.classList.add('hidden');
    accountSection.classList.add('hidden');

    submissionResultView.classList.remove('hidden');
    submissionMessage.textContent = 'Submitting...';
    submissionMessage.classList.add('text-green-600');

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
        submissionMessage.textContent = 'Table submitted successfully!';
        itemTableBody.innerHTML = '';
        scannedCodes.length = 0;
        confirmedAccount = null;
        confirmedAccountName = null;
        confirmedWarehouseCode = null;
        window.pendingSubmission = null;
      } else {
        submissionMessage.textContent = 'Failed to submit table';
        console.error('Flow error:', data);
      }
    } catch (err) {
      submissionMessage.textContent = 'Network error triggering flow';
      console.error(err);
    }
  });

  cancelSubmitBtn.addEventListener('click', () => {
    confirmationView.classList.add('hidden');
    tableView.classList.remove('hidden');
    output.textContent = 'Submission cancelled';
    window.pendingSubmission = null;
  });

});