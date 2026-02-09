        // WhatsApp number - GANTI DENGAN NOMOR WHATSAPP ANDA
        const whatsappNumber = "62881026788157";
        
        // Hamburger Menu Toggle
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const mainNav = document.getElementById('mainNav');
        
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('#mainNav a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
        
        // Tab navigation for games
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.game-content').forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab
                button.classList.add('active');
                
                // Show corresponding content
                const game = button.getAttribute('data-game');
                document.getElementById(`${game}-content`).classList.add('active');
            });
        });
        
        // Modals
        const topupGuideModal = document.getElementById('topupGuideModal');
        const checkoutModal = document.getElementById('checkoutModal');
        const notification = document.getElementById('notification');
        
        // Get all buttons that open the topup guide modal
        const caraTopupBtns = document.querySelectorAll('#caraTopupBtn, #caraTopupBtn2, #caraTopupBtnFooter');
        const closeTopupGuide = document.getElementById('closeTopupGuide');
        
        // Open topup guide modal
        caraTopupBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                topupGuideModal.classList.add('active');
            });
        });
        
        // Close topup guide modal
        closeTopupGuide.addEventListener('click', () => {
            topupGuideModal.classList.remove('active');
        });
        
        // Start topup from guide modal
        document.getElementById('startTopupFromGuide').addEventListener('click', () => {
            topupGuideModal.classList.remove('active');
            // Default to first Free Fire package
            openCheckoutModal('Free Fire', '70 Diamond', '10000');
        });
        
        // Checkout Modal functionality
        const closeCheckoutModal = document.getElementById('closeCheckoutModal');
        const cancelCheckout = document.getElementById('cancelCheckout');
        const checkoutForm = document.getElementById('checkout-form');
        
        // Function to open checkout modal
        function openCheckoutModal(game, amount, price) {
            // Update modal content
            document.getElementById('checkout-game').textContent = game;
            document.getElementById('checkout-amount').textContent = amount;
            document.getElementById('checkout-price').textContent = `Rp ${parseInt(price).toLocaleString('id-ID')}`;
            
            // Store data for checkout
            checkoutForm.dataset.game = game;
            checkoutForm.dataset.amount = amount;
            checkoutForm.dataset.price = price;
            
            // Reset form
            checkoutForm.reset();
            
            // Show modal
            checkoutModal.classList.add('active');
        }
        
        // Open checkout modal when "Beli Sekarang" is clicked
        document.querySelectorAll('.btn-buy').forEach(button => {
            button.addEventListener('click', () => {
                const game = button.getAttribute('data-game');
                const amount = button.getAttribute('data-amount');
                const price = button.getAttribute('data-price');
                
                openCheckoutModal(game, amount, price);
            });
        });
        
        // Close checkout modal
        closeCheckoutModal.addEventListener('click', () => {
            checkoutModal.classList.remove('active');
        });
        
        cancelCheckout.addEventListener('click', () => {
            checkoutModal.classList.remove('active');
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === topupGuideModal) {
                topupGuideModal.classList.remove('active');
            }
            if (e.target === checkoutModal) {
                checkoutModal.classList.remove('active');
            }
        });
        
        // Show notification
        function showNotification(message) {
            document.getElementById('notification-text').textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
        
        // Checkout form submission
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const game = checkoutForm.dataset.game;
            const amount = checkoutForm.dataset.amount;
            const price = checkoutForm.dataset.price;
            const userId = document.getElementById('user-id').value;
            const server = document.getElementById('server').value;
            const payment = document.getElementById('payment').value;
            const email = document.getElementById('email').value;
            const notes = document.getElementById('notes').value;
            
            // Format price with thousand separator
            const formattedPrice = parseInt(price).toLocaleString('id-ID');
            
            // Create WhatsApp message
            let message = `Halo Min, saya ingin membeli:\n\n`;
            message += `*Game:* ${game}\n`;
            message += `*Paket:* ${amount}\n`;
            message += `*Harga:* Rp ${formattedPrice}\n`;
            message += `*User ID/Nickname:* ${userId}\n`;
            message += `*Server:* ${server}\n`;
            message += `*Metode Pembayaran:* ${payment}\n`;
            
            if (email) {
                message += `*Email:* ${email}\n`;
            }
            
            if (notes) {
                message += `*Catatan:* ${notes}\n`;
            }
            
            message += `\nSilakan bantu saya untuk proses pembeliannya.`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');
            
            // Close modal
            checkoutModal.classList.remove('active');
            
            // Show success notification
            showNotification("Pesanan berhasil dikirim ke WhatsApp!");
            
            // Optional: Save to localStorage (for demo purposes)
            const order = {
                game,
                amount,
                price,
                userId,
                server,
                payment,
                email,
                notes,
                timestamp: new Date().toISOString()
            };
            
            // Save order to localStorage
            let orders = JSON.parse(localStorage.getItem('topupOrders') || '[]');
            orders.push(order);
            localStorage.setItem('topupOrders', JSON.stringify(orders));
        });
        
        // Direct WhatsApp button in hero section
        document.getElementById('btn-beli-sekarang').addEventListener('click', () => {
            // Default message for general inquiry
            const message = `Halo Min, saya ingin bertanya tentang pembelian diamond. Bisa tolong bantu saya?`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            window.open(whatsappURL, '_blank');
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Update WhatsApp float button with actual number
        document.querySelector('.whatsapp-float').href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Halo TopUpGames, saya ingin bertanya tentang pembelian diamond")}`;
        
        // Function to update WhatsApp contact in footer
        function updateWhatsappContact() {
            const formattedNumber = whatsappNumber.replace(/(\d{2})(\d{3})(\d{4})(\d{3,})/, '$1 $2-$3-$4');
            const whatsappElements = document.querySelectorAll('.fa-whatsapp').forEach(icon => {
                if (icon.parentElement.tagName === 'LI') {
                    icon.parentElement.innerHTML = `<i class="fab fa-whatsapp"></i> ${formattedNumber} (WhatsApp)`;
                }
            });
        }
        
        // Initialize
        updateWhatsappContact();