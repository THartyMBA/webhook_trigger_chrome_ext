document.addEventListener('DOMContentLoaded', function() {
  // Load saved webhook URL
  chrome.storage.sync.get(['webhookUrl'], function(result) {
    if (result.webhookUrl) {
      document.getElementById('webhookUrl').value = result.webhookUrl;
    }
  });
  
  // Save button event listener
  document.getElementById('saveButton').addEventListener('click', function() {
    const webhookUrl = document.getElementById('webhookUrl').value.trim();
    
    if (webhookUrl) {
      chrome.storage.sync.set({ webhookUrl: webhookUrl }, function() {
        showStatus('Webhook URL saved!', 'success');
      });
    } else {
      showStatus('Please enter a webhook URL', 'error');
    }
  });
  
  // Trigger button event listener
  document.getElementById('triggerButton').addEventListener('click', function() {
    const webhookUrl = document.getElementById('webhookUrl').value.trim();
    
    if (!webhookUrl) {
      showStatus('Please enter a webhook URL', 'error');
      return;
    }
    
    showStatus('Sending...', 'info');
    
    // Create a simple payload with timestamp
    const payload = {
      triggered_at: new Date().toISOString()
    };
    
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
