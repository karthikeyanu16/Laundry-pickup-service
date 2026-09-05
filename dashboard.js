/**
 * FreshPress - Dashboard Interactive Controller
 * Powers both Customer Dashboard & Admin Operations Portal
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Customer Dashboard: Order Status Stepper Simulation
     ========================================================================== */
  const stepperContainer = document.getElementById('user-order-stepper');
  if (stepperContainer) {
    const stepNodes = stepperContainer.querySelectorAll('.step-node');
    const progressBar = document.getElementById('stepper-progress-fill');
    const statusBadge = document.getElementById('current-order-status-badge');
    const statusNote = document.getElementById('current-order-status-note');

    const orderStages = [
      {
        step: 1,
        title: 'Pickup Scheduled',
        badge: 'Pickup Confirmed',
        note: 'Driver assigned. Arriving today between 4:00 PM – 6:00 PM.'
      },
      {
        step: 2,
        title: 'Picked Up by Courier',
        badge: 'In Transit to Hub',
        note: 'Garments safely picked up by courier Mark D. (Van #04).'
      },
      {
        step: 3,
        title: 'Cleaning & Eco Washing',
        badge: 'In Treatment',
        note: 'Items sorted into organic wet-cleaning & steam pressing cycles.'
      },
      {
        step: 4,
        title: 'Ironing & Quality Inspection',
        badge: 'Final QC Passed',
        note: 'Garments inspected, hand-steamed, and wrapped in protective covers.'
      },
      {
        step: 5,
        title: 'Out for Delivery',
        badge: 'Out for Delivery',
        note: 'Courier Alex is on the way to your address! ETA: 35 mins.'
      }
    ];

    let currentStageIndex = 2; // Default to step 3 (Cleaning) for demonstration

    const updateStepperUI = (index) => {
      currentStageIndex = index;
      const totalSteps = stepNodes.length;
      const progressPercent = (index / (totalSteps - 1)) * 100;

      if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
      }

      stepNodes.forEach((node, idx) => {
        node.classList.remove('completed', 'active');
        if (idx < index) {
          node.classList.add('completed');
        } else if (idx === index) {
          node.classList.add('active');
        }
      });

      const currentStage = orderStages[index] || orderStages[0];
      if (statusBadge) statusBadge.textContent = currentStage.badge;
      if (statusNote) statusNote.textContent = currentStage.note;
    };

    updateStepperUI(currentStageIndex);

    // Interactive Demo Simulation Buttons
    const nextStepBtn = document.getElementById('btn-sim-next-step');
    const prevStepBtn = document.getElementById('btn-sim-prev-step');

    if (nextStepBtn) {
      nextStepBtn.addEventListener('click', () => {
        if (currentStageIndex < orderStages.length - 1) {
          updateStepperUI(currentStageIndex + 1);
        } else {
          alert('Order is already delivered!');
        }
      });
    }

    if (prevStepBtn) {
      prevStepBtn.addEventListener('click', () => {
        if (currentStageIndex > 0) {
          updateStepperUI(currentStageIndex - 1);
        }
      });
    }
  }

  /* ==========================================================================
     2. Customer Dashboard: Interactive Booking / Schedule Modal
     ========================================================================== */
  const scheduleBookingForm = document.getElementById('schedule-pickup-modal-form');
  if (scheduleBookingForm) {
    scheduleBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const serviceType = document.getElementById('book-service-type')?.value;
      const pickupDate = document.getElementById('book-pickup-date')?.value;
      const timeSlot = document.getElementById('book-time-slot')?.value;
      const address = document.getElementById('book-address-select')?.value;

      if (!pickupDate) {
        alert('Please pick a convenient date for your laundry pickup.');
        return;
      }

      const submitBtn = scheduleBookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Scheduling Pickup...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Close modal
        const modal = document.getElementById('modal-schedule-pickup');
        if (modal) modal.classList.remove('active');

        // Add dummy entry to order history or show confirmation alert
        alert(`Success! Your pickup has been booked for ${pickupDate} (${timeSlot}) at ${address}. Confirmation code: #FP-9042.`);
        scheduleBookingForm.reset();
      }, 900);
    });
  }

  /* ==========================================================================
     3. Customer Dashboard: Invoice Modal Viewer & Printable Receipt
     ========================================================================== */
  document.querySelectorAll('[data-view-invoice]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const orderId = btn.getAttribute('data-view-invoice') || '#FP-8921';
      const orderDate = btn.getAttribute('data-order-date') || 'Aug 28, 2026';
      const orderAmount = btn.getAttribute('data-order-amount') || '$42.50';
      const orderItems = btn.getAttribute('data-order-items') || '3x Business Shirts, 1x Two-Piece Suit, 2x Wool Sweaters';

      const invoiceModal = document.getElementById('modal-invoice-viewer');
      if (invoiceModal) {
        document.getElementById('inv-modal-order-id').textContent = orderId;
        document.getElementById('inv-modal-date').textContent = orderDate;
        document.getElementById('inv-modal-amount').textContent = orderAmount;
        document.getElementById('inv-modal-items').textContent = orderItems;
        invoiceModal.classList.add('active');
      }
    });
  });

  const printInvoiceBtn = document.getElementById('btn-print-invoice');
  if (printInvoiceBtn) {
    printInvoiceBtn.addEventListener('click', () => {
      window.print();
    });
  }

  /* ==========================================================================
     4. Customer Dashboard: Saved Delivery Addresses Manager
     ========================================================================== */
  const addressList = document.getElementById('saved-addresses-grid');
  const addAddressForm = document.getElementById('add-address-form');

  if (addAddressForm && addressList) {
    addAddressForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const label = document.getElementById('new-address-label')?.value || 'New Location';
      const street = document.getElementById('new-address-street')?.value || '';
      const apt = document.getElementById('new-address-apt')?.value || '';
      const cityZip = document.getElementById('new-address-cityzip')?.value || '';
      const isDefault = document.getElementById('new-address-default')?.checked;

      const newCard = document.createElement('div');
      newCard.className = 'card address-card';
      newCard.innerHTML = `
        <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-location-dot" style="color: var(--primary); font-size: 1.2rem;"></i>
            <h4 style="margin: 0; font-size: 1.05rem;">${label}</h4>
          </div>
          ${isDefault ? '<span class="badge badge-success">Default</span>' : '<span class="badge badge-secondary">Secondary</span>'}
        </div>
        <p style="font-size: 0.9rem; margin-bottom: 16px;">
          ${street} ${apt ? ', ' + apt : ''}<br>
          ${cityZip}
        </p>
        <div style="display: flex; gap: 10px; margin-top: auto;">
          <button type="button" class="btn btn-outline btn-sm" style="flex: 1;">Edit</button>
          <button type="button" class="btn btn-outline btn-sm btn-delete-address" style="color: var(--danger);"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      `;

      addressList.appendChild(newCard);

      // Bind delete handler
      newCard.querySelector('.btn-delete-address').addEventListener('click', () => {
        if (confirm(`Remove "${label}" from saved addresses?`)) {
          newCard.remove();
        }
      });

      // Close modal
      const modal = document.getElementById('modal-add-address');
      if (modal) modal.classList.remove('active');
      addAddressForm.reset();
    });

    // Existing delete buttons
    document.querySelectorAll('.btn-delete-address').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = btn.closest('.address-card');
        if (card && confirm('Delete this saved delivery address?')) {
          card.remove();
        }
      });
    });
  }

  /* ==========================================================================
     5. Admin Dashboard: Orders Status Management & Fleet Assignment
     ========================================================================== */
  document.querySelectorAll('.admin-status-select').forEach(select => {
    select.addEventListener('change', () => {
      const row = select.closest('tr');
      const badge = row.querySelector('.order-status-badge');
      const selectedVal = select.value;

      if (!badge) return;

      if (selectedVal === 'pending') {
        badge.className = 'badge badge-warning order-status-badge';
        badge.textContent = 'Pickup Pending';
      } else if (selectedVal === 'washing') {
        badge.className = 'badge badge-primary order-status-badge';
        badge.textContent = 'In Washing';
      } else if (selectedVal === 'delivery') {
        badge.className = 'badge badge-primary order-status-badge';
        badge.textContent = 'Out for Delivery';
      } else if (selectedVal === 'completed') {
        badge.className = 'badge badge-success order-status-badge';
        badge.textContent = 'Delivered';
      } else if (selectedVal === 'cancelled') {
        badge.className = 'badge badge-danger order-status-badge';
        badge.textContent = 'Cancelled';
      }
    });
  });

  /* ==========================================================================
     6. Admin Dashboard: Chart.js Initialization (with Fallback)
     ========================================================================== */
  const revenueChartCanvas = document.getElementById('admin-revenue-chart');
  if (revenueChartCanvas && typeof Chart !== 'undefined') {
    new Chart(revenueChartCanvas, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Total Orders',
            data: [45, 62, 58, 80, 110, 145, 95],
            borderColor: '#0284c7',
            backgroundColor: 'rgba(2, 132, 199, 0.1)',
            fill: true,
            tension: 0.35
          },
          {
            label: 'Revenue ($)',
            data: [1200, 1750, 1500, 2400, 3200, 4100, 2800],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.35,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Order Count' } },
          y1: {
            position: 'right',
            grid: { drawOnChartArea: false },
            title: { display: true, text: 'Revenue ($)' }
          }
        }
      }
    });
  }

});
