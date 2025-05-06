document.addEventListener('DOMContentLoaded', function() {
  // Load saved webhook URL and parameters
  chrome.storage.sync.get(['webhookUrl', 'webhookParams'], function(result) {
    if (result.webhookUrl) {
      document.getElementById('webhookUrl').value = result.webhookUrl;
    }
    if (result.webhookParams) {
      document.getElementById('webhookParams').value = result.webhookParams;
    }
  });
  
  // Save button event listener
  document.getElementById('saveButton').addEventListener('click', function() {
    const webhookUrl = document.getElementById('webhookUrl').value.trim();
    const webhookParams = document.getElementById('webhookParams').value.trim();
    
    if (webhookUrl) {
      chrome.storage.sync.set({ webhookUrl: webhookUrl, webhookParams: webhookParams }, function() {
        showStatus('Configuration saved!', 'success');
      });
    } else {
      showStatus('Please enter at least a webhook URL', 'error');
    }
  });
  
  // Trigger button event listener
  document.getElementById('triggerButton').addEventListener('click', function() {
    const webhookUrl = document.getElementById('webhookUrl').value.trim();
    const webhookParamsString = document.getElementById('webhookParams').value.trim();
    
    if (!webhookUrl) {
      showStatus('Please enter a webhook URL', 'error');
      return;
    }
    
    showStatus('Sending...', 'info');

    let payload;

    if (webhookParamsString) {
      try {
        payload = JSON.parse(webhookParamsString);
      } catch (e) {
        showStatus('Error: Invalid JSON in parameters. Please correct it.', 'error');
        console.error('JSON Parse Error:', e);
        return;
      }
    } else {
      // Default payload if no parameters are provided
      payload = {
        triggered_at: new Date().toISOString(),
        message: "Webhook triggered from Chrome Extension (no custom params)"
      };
    }

    // Send the webhook request
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.text();
    })
    .then(() => {
      showStatus('Webhook triggered successfully!', 'success');
    })
    .catch(error => {
      showStatus(`Error: ${error.message}`, 'error');
      console.error('Webhook error:', error);
    });
  });
});

// Show status message
function showStatus(message, type) {
  const statusEl = document.getElementById('statusMessage');
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
  
  // Clear after 3 seconds
  setTimeout(() => {
    statusEl.textContent = '';
    statusEl.className = 'status';
  }, 3000);
}
