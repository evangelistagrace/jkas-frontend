let isUser;
class IdleTimer {
    constructor({ timeout, onTimeout }) {
        this.timeout = timeout;
        this.onTimeout = onTimeout;
        this.eventHandler = this.updateExpiredTime.bind(this);
        this.tracker();
        this.startInterval();
    }
    startInterval() {
        this.updateExpiredTime();
        this.interval = setInterval(() => {
            const expiredTime = parseInt(localStorage.getItem("_expiredTime"), 10);
            if (expiredTime < Date.now()) {
                if (this.onTimeout) {
                    this.onTimeout();
                    // this.cleanUp();
                }
            }
        }, 10000);
    }
    updateExpiredTime() {
        if (this.timeoutTracker) {
            clearTimeout(this.timeoutTracker);
        }
        this.timeoutTracker = setTimeout(() => {
            localStorage.setItem("_expiredTime", Date.now() + this.timeout * 1000);
        }, 300);
    }
    tracker() {
        window.addEventListener("mousemove", this.eventHandler);
        window.addEventListener("scroll", this.eventHandler);
        window.addEventListener("keydown", this.eventHandler);
    }
    cleanUp() {
        clearInterval(this.interval);

        this.updateExpiredTime();
        isUser = localStorage.getItem('isUser');
        if (isUser == 'dbkl' || isUser == 'agensi' || isUser == 'public') {
            this.startInterval();
        }
    }
}
export default IdleTimer;