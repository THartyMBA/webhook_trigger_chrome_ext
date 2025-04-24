document.addEventListener('DOMContentLoaded', function() {
  // Load saved webhook URL
  chrome.storage.sync.get(['webhookUrl'], function(result) {
    if (result.webhookUrl) {
      document.getElementById('webhookUrl').value = result.webhookUrl;
    }
  });
