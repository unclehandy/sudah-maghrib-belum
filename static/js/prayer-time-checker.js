// prayer_time/static/js/prayer-time-checker.js
document.addEventListener('alpine:init', () => {
    Alpine.data('prayerTimeChecker', () => ({
        // State variables
        isLoading: true,
        error: false,
        errorMessage: '',
        location: 'Loading...',
        maghribTime: '--:--',
        timezone: 'UTC',
        calculationMethod: '--',
        statusText: 'Checking...',
        statusClasses: 'bg-blue-100 text-blue-800',
        timeRemaining: 'Sistem sedang menghitung...',
        isMaghribNow: false,

        // Initialization
        async init() {
            try {
                const position = await this.getLocation();
                await Promise.all([
                    this.fetchLocationName(position),
                    this.fetchPrayerTimes(position)
                ]);
                this.startTimeChecker();
                this.isLoading = false;
            } catch (error) {
                this.handleError(error);
            }
        },

        // Get user's location
        getLocation() {
            return new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject(new Error('Geolocation tidak didukung di browser ini'));
                    return;
                }

                navigator.geolocation.getCurrentPosition(
                    resolve,
                    error => reject(this.handleGeolocationError(error)),
                    { timeout: 10000 } // 10 second timeout
                );
            });
        },

        // Fetch location name from coordinates
        async fetchLocationName(position) {
            try {
                const response = await fetch(
                    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
                );
                const data = await response.json();
                this.location = [data.city, data.countryName].filter(Boolean).join(', ') || 'Lokasimu saat ini';
            } catch (error) {
                console.error('Location fetch error:', error);
                throw new Error('Gagal mendapatkan nama lokasi');
            }
        },

        // Fetch prayer times from API
        async fetchPrayerTimes(position) {
            try {
                const today = new Date();
                const dateStr = today.toLocaleDateString('en-GB').replace(/\//g, '-'); // DD-MM-YYYY format
                
                const response = await fetch(
                    `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&method=2`
                );
                const data = await response.json();

                if (data.code === 200) {
                    this.maghribTime = data.data.timings.Maghrib;
                    this.calculationMethod = data.data.meta.method.name;
                    this.timezone = data.data.meta.timezone;
                } else {
                    throw new Error('Gagal mendapatkan waktu sholat');
                }
            } catch (error) {
                console.error('Prayer times fetch error:', error);
                throw new Error('Error jaringan: ' + error.message);
            }
        },

        // Start time checking interval
        startTimeChecker() {
            // Initial check
            this.checkCurrentTime();
            
            // Update every second
            this.timeInterval = setInterval(() => {
                this.checkCurrentTime();
            }, 1000);
        },

        // Check current time against Maghrib time
        checkCurrentTime() {
            const now = new Date();
            const options = { 
                timeZone: this.timezone,
                hour: 'numeric',
                minute: 'numeric',
                hour12: false
            };
            
            const currentTime = now.toLocaleString('en-US', options);
            const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
            const [maghribHours, maghribMinutes] = this.maghribTime.split(':').map(Number);

            const currentTotal = currentHours * 60 + currentMinutes;
            const maghribTotal = maghribHours * 60 + maghribMinutes;
            const timeDiff = maghribTotal - currentTotal;

            this.updatePrayerStatus(timeDiff);
        },

        // Update UI based on time difference
        updatePrayerStatus(timeDiff) {
            const isMaghribWindow = timeDiff > -30 && timeDiff <= 30; // ±30 minutes window
            
            if (isMaghribWindow) {
                this.isMaghribNow = true;
                this.statusText = "Sudah Waktu Maghrib!";
                this.statusClasses = 'bg-white/20 text-white';
                this.timeRemaining = timeDiff > 0 
                    ? "Maghrib akan tiba segera!" 
                    : "Sudah waktunya Maghrib. Silahkan berbuka.";
            } else {
                this.isMaghribNow = false;
                
                if (timeDiff > 0) {
                    const hours = Math.floor(timeDiff / 60);
                    const minutes = timeDiff % 60;
                    this.timeRemaining = `Jangan buka dulu ya. Maghrib masih ${hours} jam ${minutes} menit lagi`;
                    this.statusText = "Belum Waktu Maghrib";
                    this.statusClasses = 'bg-blue-100 text-blue-800';
                } else {
                    const hours = Math.floor(-timeDiff / 60);
                    const minutes = -timeDiff % 60;
                    this.timeRemaining = `Maghrib telah lewat ${hours} jam ${minutes} menit`;
                    this.statusText = "Waktu Maghrib Telah Lewat";
                    this.statusClasses = 'bg-gray-100 text-gray-800';
                }
            }
        },

        // Handle geolocation errors
        handleGeolocationError(error) {
            const errors = {
                1: 'Izin lokasi ditolak',
                2: 'Informasi lokasi tidak tersedia',
                3: 'Permintaan lokasi timeout'
            };
            return new Error(errors[error.code] || 'Error tidak diketahui');
        },

        // General error handler
        handleError(error) {
            this.isLoading = false;
            this.error = true;
            this.errorMessage = error.message;
            console.error('Application error:', error);
            
            // Clean up interval if exists
            if (this.timeInterval) {
                clearInterval(this.timeInterval);
            }
        },

        // Clean up when component is removed
        destroy() {
            if (this.timeInterval) {
                clearInterval(this.timeInterval);
            }
        }
    }));
});