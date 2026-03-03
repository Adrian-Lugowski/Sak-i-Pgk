// Klasa pojedyńczej wskazówki
class Hand {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }

    // Metoda która rysuje wskazówkę pod danym kątem
    draw(ctx, angle) {
        ctx.save();
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.width, 0);
        ctx.lineWidth = this.height;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.restore();
    }
}

// Klasa zegara
class Clock {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.radius = Math.min(this.canvas.width, this.canvas.height) / 2;

        // Tworzenie wskazówek z różnymi długościami, grubościami i kolorami
        this.hourhand = new Hand(this.radius * 0.5, 8, '#2c3e50');
        this.minutehand = new Hand(this.radius * 0.75, 5, '#34495e');
        this.secondhand = new Hand(this.radius * 0.85, 2, '#e74c3c');

        this.isPaused = false;
        this.frozenTime = new Date();

        this.initEvents();
        this.animate();
    }

    // Metoda do obsługi zdarzeń klawiatury
    initEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                this.isPaused = !this.isPaused;
                if (this.isPaused) {
                    this.frozenTime = new Date();
                }
            }
        });
    }

    // Metoda do rysowania tarczy zegara
    drawDial(ctx) {
        // Rysowanie kresek minutowych i godzinowych
        for (let i = 0; i < 60; i++) {
            ctx.save();
            ctx.rotate(i * (Math.PI * 2) / 60);
            ctx.beginPath();

            // Dłuższa i grubsza kreska dla godzin
            if (i % 5 === 0) {
                ctx.moveTo(this.radius * 0.85, 0);
                ctx.lineTo(this.radius * 0.95, 0);
                ctx.lineWidth = 4;
            } else {
                // Krótsza i cieńsza kreska dla minut
                ctx.moveTo(this.radius * 0.9, 0);
                ctx.lineTo(this.radius * 0.95, 0);
                ctx.lineWidth = 1;
            }
            ctx.strokeStyle = '#7f8c8d';
            ctx.stroke();
            ctx.restore();
        }
    }

    // Metoda do rysowania całego zegara
    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.save();
        // Przesunięcie układu współrzędnych do środka tarczy i obrócenie o -90 stopni
        ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        ctx.rotate(-Math.PI / 2);

        // Rysowanie tarczy zegara
        this.drawDial(ctx);
        const now = this.isPaused ? this.frozenTime : new Date();

        // Obliczanie kątów dla każdej wskazówki
        const ms = now.getMilliseconds();
        const sec = now.getSeconds();
        const min = now.getMinutes();
        const h = now.getHours();

        // Kąty dla sekund, minut i godzin
        const secAngle = (Math.PI * 2) * (sec + ms / 1000) / 60;
        const minAngle = (Math.PI * 2) * (min + sec / 60) / 60;
        const hourAngle = (Math.PI * 2) * (h % 12 + min / 60) / 12;

        // Rysowanie wskazówek
        this.hourhand.draw(ctx, hourAngle);
        this.minutehand.draw(ctx, minAngle);
        this.secondhand.draw(ctx, secAngle);

        // Rysowanie centralnego punktu
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#2c3e50';
        ctx.fill();
        ctx.restore();
    }

    // Metoda do animacji zegara
    animate = () => {
        this.draw();
        requestAnimationFrame(this.animate);
    }
}

// Inicjalizacja zegara po załadowaniu strony
window.onload = () => {
    new Clock('clock');
};