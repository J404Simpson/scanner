document.addEventListener('DOMContentLoaded', () => {
  const videoElement = document.getElementById('video');
  const output = document.getElementById('output');
  const scanningView = document.getElementById('scanningView');
  const tableView = document.getElementById('tableView');
  const verifyAccountBtn = document.getElementById('verifyAccountBtn');
  const startBtn = document.getElementById('startBtn');
  const cancelScanBtn = document.getElementById('cancelScanBtn');
  const scanNextBtn = document.getElementById('scanNextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const scanTableBody = document.querySelector('#scanTable tbody');

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

  updateViewState();

  async function verifyAccountNumber() {
    const input = document.getElementById('accountInput');
    const status = document.getElementById('accountStatus');
    const accountNumber = input.value.trim();

    if (!accountNumber) {
      status.textContent = '⚠️ Please enter an account number.';
      status.style.color = 'darkorange';
      return;
    }

    status.textContent = '🔍 Looking up account...';
    status.style.color = 'black';

    try {
      const res = await fetch(
        `https://inventoryscannerapi-e5e2bfbhc2dkfsb6.germanywestcentral-01.azurewebsites.net/api/account?number=${encodeURIComponent(accountNumber)}`
      );

      if (res.status === 404) {
        status.textContent = '❌ Account not found or missing required information.';
        status.style.color = 'red';
        return;
      }

      if (res.status === 422) {
        status.textContent = '⚠️ Account exists but warehouse code is missing. Please contact support.';
        status.style.color = 'darkorange';
        return;
      }

      if (!res.ok) {
        status.textContent = '❌ Server error. Please try again later.';
        status.style.color = 'red';
        return;
      }

      const data = await res.json();

      status.innerHTML = `
        ✅ Found: ${data.name} <br/>📦 Warehouse: ${data.warehouseCode} <br/>Is this correct? 
        <button id="confirmAccountBtn">Yes</button> 
        <button id="rejectAccountBtn">No</button>
      `;
      status.style.color = 'green';

      setTimeout(() => {
        const confirmBtn = document.getElementById('confirmAccountBtn');
        const rejectBtn = document.getElementById('rejectAccountBtn');

        confirmBtn?.addEventListener('click', async () => {
          confirmedAccount = accountNumber;
          confirmedAccountName = data.name;
          confirmedWarehouseCode = data.warehouseCode;

          await fetchConsignmentItems(data.warehouseCode);

          document.getElementById('accountSection').classList.add('hidden');
          document.getElementById('tableView').classList.remove('hidden');
          output.textContent = `✅ Confirmed: ${data.name} (Warehouse: ${data.warehouseCode})`;
          updateViewState();
        });

        rejectBtn?.addEventListener('click', () => {
          confirmedAccount = null;
          confirmedAccountName = null;
          confirmedWarehouseCode = null;
          status.textContent = '⚠️ Please enter the correct account number.';
          status.style.color = 'darkorange';
          input.value = '';
          updateViewState();
        });
      }, 0);

    } catch (err) {
      console.error('Account lookup failed:', err);
      status.textContent = '❌ Network or server error.';
      status.style.color = 'red';
    }
  }

  async function fetchConsignmentItems(warehouseCode) {
    try {
      const res = await fetch(
        `https://inventoryscannerapi-e5e2bfbhc2dkfsb6.germanywestcentral-01.azurewebsites.net/api/items?warehouseCode=${encodeURIComponent(warehouseCode)}`
      );

      if (!res.ok) {
        console.warn(`⚠ Unable to fetch items for ${warehouseCode}`);
        consignmentItems = [];
        renderConsignmentItems();
        return;
      }

      const data = await res.json();
      consignmentItems = data.items || [];
      console.log(`📦 Loaded ${consignmentItems.length} consignment items for warehouse ${warehouseCode}`);
      renderConsignmentItems();

    } catch (err) {
      console.error('❌ Failed to fetch consignment items:', err);
      consignmentItems = [];
      renderConsignmentItems();
    }
  }

  function renderConsignmentItems() {
    const tbody = document.querySelector('#consignmentTable tbody');
    tbody.innerHTML = '';

    if (!consignmentItems || consignmentItems.length === 0) {
      document.getElementById('consignmentSection').classList.add('hidden');
      return;
    }

    consignmentItems.forEach((item, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.cr5bd_lotnumber || ''}</td>
        <td>${item.cr5bd_quantity || 0}</td>
      `;
      tbody.appendChild(row);
    });

    document.getElementById('consignmentSection').classList.remove('hidden');
  }

  function updateViewState() {
    const scannedSection = document.getElementById('scannedSection');
    const hasScans = scannedCodes.length > 0;

    startBtn.classList.toggle('hidden', hasScans || !confirmedAccount);
    startBtn.disabled = !confirmedAccount;

    scanNextBtn.classList.toggle('invisible', !hasScans);
    scanNextBtn.disabled = !hasScans;

    submitBtn.disabled = !hasScans;

    scannedSection.classList.toggle('hidden', !hasScans);
  }

  async function selectBackCamera() {
    try {
      const devices = await codeReader.listVideoInputDevices();
      console.log('Available video devices:', devices);

      if (devices.length === 0) return null;

      // Prefer a camera with 'back', 'rear', or 'environment' in label
      const backCamera = devices.find(d =>
        d.label.toLowerCase().includes('back') ||
        d.label.toLowerCase().includes('rear') ||
        d.label.toLowerCase().includes('environment')
      );

      // fallback: first device
      return backCamera ? backCamera.deviceId : devices[0].deviceId;

    } catch (err) {
      console.error('Error listing video devices:', err);
      return null;
    }
  }

  function startScan() {
    if (!currentDeviceId) {
      output.textContent = '❌ No camera selected.';
      return;
    }

    scanningView.classList.remove('hidden');
    tableView.classList.add('hidden');

    output.textContent = '📡 Scanning...';
    scanNextBtn.disabled = true;

    codeReader.reset();
    lastScannedCode = null;

    // Ensure video element settings
    videoElement.autoplay = true;
    videoElement.playsInline = true;
    videoElement.srcObject = null;

    codeReader.decodeFromVideoDevice(currentDeviceId, videoElement, (result, err) => {
      if (result && !scanCooldown) {
        scanCooldown = true;
        setTimeout(() => (scanCooldown = false), 1000);

        let code = result.getText().replace(/[\x00-\x1F]/g, '');
        const format = result.getBarcodeFormat();

        if (format === ZXing.BarcodeFormat.CODE_128 && !isLikelyGS1(code)) {
          output.textContent = `⚠️ Skipped non-GS1 CODE_128: ${code}`;
          scanNextBtn.disabled = false;
          return;
        }

        const existing = scannedCodes.find(entry => entry.code === code);

        if (existing) {
          existing.count++;
          updateCount(code, existing.count);
          output.textContent = `➕ Duplicate found. Count incremented.`;
        } else {
          const entry = { code, format, count: 1 };
          scannedCodes.push(entry);
          addToTable(scannedCodes.length, entry);
          output.textContent = `✅ New QR code added.`;
        }

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

  // ... (rest of your parsing, addToTable, parseGS1, isLikelyGS1, updateCount, etc. remain unchanged) ...

  verifyAccountBtn.addEventListener('click', verifyAccountNumber);

  startBtn.addEventListener('click', async () => {
    if (!confirmedAccount) {
      output.textContent = '⚠️ Please confirm the account before scanning.';
      return;
    }

    document.getElementById('tableView').classList.add('hidden');
    document.getElementById('scanningView').classList.remove('hidden');
    output.textContent = '📷 Initializing camera...';

    try {
      currentDeviceId = await selectBackCamera();
      if (!currentDeviceId) {
        output.textContent = '❌ No camera found.';
        return;
      }
      startScan();
    } catch (err) {
      output.textContent = `❌ Camera error: ${err.message || err}`;
      console.error(err);
    }
  });

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
    if (scannedCodes.length === 0) {
      output.textContent = '⚠️ No codes to submit.';
      return;
    }

    if (!confirmedAccount) {
      output.textContent = '⚠️ No account confirmed.';
      return;
    }

    output.textContent = '🚀 Submitting scanned codes...';

    const payload = {
      account: confirmedAccount,
      accountName: confirmedAccountName,
      codes: scannedCodes
    };

    console.log(payload);
  });

});