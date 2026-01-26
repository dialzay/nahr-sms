/* Add to globals.css for better SMS UI */
.sms-message {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Status badge animations */
.bg-red-100 { animation: pulseCritical 2s infinite; }
.bg-yellow-100 { animation: pulseWarning 3s infinite; }

@keyframes pulseCritical {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes pulseWarning {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.9; }
}
