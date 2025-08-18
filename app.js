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
      const res = await fetch(`https://inventoryscannerapi-e5e2bfbhc2dkfsb6.germanywestcentral-01.azurewebsites.net/api/account?number=${encodeURIComponent(accountNumber)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data && data.name) {
        status.innerHTML = `✅ Found: ${data.name}<br/>Is this correct? <button id="confirmAccountBtn">Yes</button> <button id="rejectAccountBtn">No</button>`;
        status.style.color = 'green';

        updateViewState();

        // Set up confirmation buttons
        setTimeout(() => {
          const confirmBtn = document.getElementById('confirmAccountBtn');
          const rejectBtn = document.getElementById('rejectAccountBtn');

          confirmBtn?.addEventListener('click', () => {
            confirmedAccount = accountNumber;
            confirmedAccountName = data.name;

            // Hide account input section
            document.getElementById('accountSection').classList.add('hidden');

            // Show the table view (default state after confirmation)
            document.getElementById('tableView').classList.remove('hidden');

            // Set confirmed message somewhere if desired
            output.textContent = `✅ Confirmed: ${data.name}`;

            updateViewState();
          });

          rejectBtn?.addEventListener('click', () => {
            confirmedAccount = null;
            confirmedAccountName = null;
            status.textContent = '⚠️ Please enter the correct account number.';
            status.style.color = 'darkorange';
            input.value = '';
            updateViewState();
          });
        }, 0);

      } else {
        status.textContent = '❌ Account not found.';
        status.style.color = 'red';
      }

    } catch (err) {
      console.error('Account lookup failed:', err);
      status.textContent = '❌ Error contacting server.';
      status.style.color = 'red';
    }
  }

  function updateViewState() {
    const scannedSection = document.getElementById('scannedSection');
    const hasScans = scannedCodes.length > 0;

    // Show Start button only if no scans exist and account is confirmed
    startBtn.classList.toggle('hidden', hasScans || !confirmedAccount);
    startBtn.disabled = !confirmedAccount;

    // Show Scan Next only if there are scans
    scanNextBtn.classList.toggle('invisible', !hasScans);
    scanNextBtn.disabled = !hasScans;

    // Enable Submit only if there are scans
    submitBtn.disabled = !hasScans;

    // Show/hide scanned table
    scannedSection.classList.toggle('hidden', !hasScans);
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

  function startScan() {
    scanningView.classList.remove('hidden');
    tableView.classList.add('hidden');

    codeReader.reset();
    output.textContent = '📡 Scanning...';
    scanNextBtn.disabled = true;
    lastScannedCode = null;


    codeReader.decodeFromVideoDevice(currentDeviceId, videoElement, (result, err) => {
      if (result && !scanCooldown) {
        scanCooldown = true;
        setTimeout(() => (scanCooldown = false), 1000); // 1 second lockout

        let code = result.getText().replace(/[\x00-\x1F]/g, '');
        const format = result.getBarcodeFormat();

        if (format === ZXing.BarcodeFormat.CODE_128 && !isLikelyGS1(code)) {
          output.textContent = `⚠️ Skipped non-GS1 CODE_128: ${code}`;
          codeReader.reset();
          scanNextBtn.disabled = false;
          return;
        }

        lastScannedCode = code;

        const existing = scannedCodes.find(entry => entry.code === code);
        if (existing) {
          existing.count++;
          updateCount(code, existing.count);
          output.textContent = '➕ Duplicate found. Count incremented.';
        } else {
          const entry = { code, format, count: 1 };
          scannedCodes.push(entry);
          addToTable(scannedCodes.length, entry);
          output.textContent = '✅ New QR code added.';
        }

        scanningView.classList.add('hidden');
        tableView.classList.remove('hidden');
        updateViewState();
      } else if (err && !(err instanceof ZXing.NotFoundException)) {
        output.textContent = '⚠️ Scan error.';
        console.error('Scan error:', err);
        updateViewState();
      }
    });
  }

  function addToTable(index, entry) {
    const row = document.createElement('tr');
    const parsed = isLikelyGS1(entry.code)
      ? parseGS1(entry.code, entry.format)
      : { code: entry.code }; // fallback — don't try parsing non-GS1

    // const parsed = parseGS1(entry.code, entry.format);

    row.dataset.code = entry.code;
    row.innerHTML = `
      <td data-label="#">${index}</td>
      <td data-label="Device Id">${parsed.device || ''}</td>
      <td data-label="Production Date">${parsed.produced || ''}</td>
      <td data-label="Expiry Date">${parsed.expiry || ''}</td>
      <td data-label="Lot Number">${parsed.lot || ''}</td>
      <td data-label="Count" class="count">${entry.count}</td>
      <td data-label="Action"><button class="inline-remove">Remove</button></td>
    `;

    // Add event listener to the inline remove button
    row.querySelector('.inline-remove').addEventListener('click', () => {
      const code = entry.code;
      const index = scannedCodes.findIndex(e => e.code === code);
      if (index !== -1) {
        const item = scannedCodes[index];
        if (item.count > 1) {
          item.count--;
          updateCount(code, item.count);
          output.textContent = `↩️ Decremented count (${item.count} left)`;
        } else {
          scannedCodes.splice(index, 1);
          row.remove();
          output.textContent = `🗑️ Removed code from list`;

          // Clear last scanned code if applicable
          if (lastScannedCode === code) {
            lastScannedCode = null;
          }
        }

        // Check for empty list
        if (scannedCodes.length === 0) {
          lastScannedCode = null;
        }
        updateViewState();
      }
    });

    scanTableBody.appendChild(row);  
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

  function updateCount(code, count) {
    const row = scanTableBody.querySelector(`tr[data-code="${code}"]`);
    if (row) {
      const countCell = row.querySelector('.count');
      if (countCell) countCell.textContent = count;
    }
  }

  scanNextBtn.addEventListener('click', () => startScan());

  cancelScanBtn.addEventListener('click', () => {
    codeReader.reset();
    scanningView.classList.add('hidden');
    tableView.classList.remove('hidden');
    output.textContent = '✅ Scan cancelled.';
    scanCooldown = false;
    updateViewState();
  });


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

    // 🔁 Replace this with your real API URL
    // fetch('https://your-api.com/submit', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ codes: scannedCodes })
    // })
    // .then(res => {
    //   if (!res.ok) throw new Error('Server returned an error');
    //   return res.json();
    // })
    // .then(data => {
    //   output.textContent = '✅ Data submitted successfully!';
    //   console.log('Server response:', data);
    // })
    // .catch(err => {
    //   output.textContent = '❌ Submission failed. Check console.';
    //   console.error('Submission error:', err);
    // });

  });
});
