const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainImage = document.getElementById('mainImage');

// รูปภาพที่จะเปลี่ยนเมื่อกด "ใช่"
const happyImages = [
    'https://media.tenor.com/NFAZkuLYdqwAAAAm/%EB%AA%A8%EB%AA%A8%EC%B0%8C-%ED%8C%94%EC%A7%9D%ED%8C%94%EC%A7%9D.webp'
];

// ตั้งค่าตำแหน่งเริ่มต้นให้ปุ่ม "ไม่"
function setInitialPosition() {
    const buttonsContainer = document.querySelector('.buttons');
    const containerRect = buttonsContainer.getBoundingClientRect();
    
    // ตั้งค่าตำแหน่งเริ่มต้น (ด้านขวาของปุ่มใช่)
    const initialX = containerRect.width / 2 + 50;
    const initialY = containerRect.height / 2 - noBtn.offsetHeight / 2;
    
    noBtn.style.left = initialX + 'px';
    noBtn.style.top = initialY + 'px';
}

// ฟังก์ชันสุ่มตำแหน่งภายในขอบเขตที่กำหนด (ไม่ซ้อนกับปุ่มใช่)
function getRandomPosition(button) {
    const buttonsContainer = document.querySelector('.buttons');
    const containerRect = buttonsContainer.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const yesBtnRect = yesBtn.getBoundingClientRect();
    
    // คำนวณขอบเขตที่ปุ่มสามารถเคลื่อนที่ได้ (ภายใน buttons container)
    const maxX = containerRect.width - button.offsetWidth - 200;
    const maxY = containerRect.height - button.offsetHeight - 200;
    const minX = 0;
    const minY = 0;
    
    let x, y;
    let attempts = 0;
    const maxAttempts = 20;
    
    // สุ่มตำแหน่งที่ไม่ซ้อนกับปุ่มใช่
    do {
        x = Math.random() * (maxX - minX) + minX;
        y = Math.random() * (maxY - minY) + minY;
        attempts++;
        
        // ตรวจสอบว่าซ้อนกับปุ่มใช่หรือไม่
        const noBtnLeft = x;
        const noBtnRight = x + button.offsetWidth;
        const noBtnTop = y;
        const noBtnBottom = y + button.offsetHeight;
        
        const yesBtnLeft = yesBtn.offsetLeft;
        const yesBtnRight = yesBtnLeft + yesBtn.offsetWidth;
        const yesBtnTop = yesBtn.offsetTop;
        const yesBtnBottom = yesBtnTop + yesBtn.offsetHeight;
        
        // ตรวจสอบการซ้อนทับ
        const isOverlapping = !(noBtnRight < yesBtnLeft || 
                               noBtnLeft > yesBtnRight || 
                               noBtnBottom < yesBtnTop || 
                               noBtnTop > yesBtnBottom);
        
        // ถ้าไม่ซ้อนและยังอยู่ในขอบเขต ให้ออกจาก loop
        if (!isOverlapping && x >= minX && x <= maxX && y >= minY && y <= maxY) {
            break;
        }
        
    } while (attempts < maxAttempts);
    
    return { x, y };
}

// ฟังก์ชันให้ปุ่ม "ไม่" หลบ
function moveNoButton() {
    const { x, y } = getRandomPosition(noBtn);
    
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
    
    // เพิ่มเอฟเฟกต์เมื่อหลบ
    noBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        noBtn.style.transform = 'scale(1)';
    }, 300);
}

// เมื่อเมาส์ hover ปุ่ม "ไม่"
noBtn.addEventListener('mouseover', moveNoButton);

// เมื่อคลิกปุ่ม "ไม่"
noBtn.addEventListener('click', moveNoButton);

// เมื่อคลิกปุ่ม "ใช่"
yesBtn.addEventListener('click', function() {
    // เปลี่ยนรูปภาพเป็นรูปที่มีความสุข (สุ่มจากอาร์เรย์)
    const randomHappyImage = happyImages[Math.floor(Math.random() * happyImages.length)];
    mainImage.src = randomHappyImage;
    
    // เพิ่มเอฟเฟกต์การเปลี่ยนรูป
    mainImage.style.transform = 'scale(1.1)';
    mainImage.style.transition = 'transform 0.5s ease';
    
    setTimeout(() => {
        mainImage.style.transform = 'scale(1)';
    }, 500);
    
    // เปลี่ยนข้อความและแสดงอนิเมชัน
    document.querySelector('.message h1').textContent = 'ขอบคุณที่ให้อภัย! 💖';
    document.querySelector('.message p').innerHTML = '';
    
    // ซ่อนปุ่ม
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    
    // เพิ่มหัวใจลอยมากขึ้น
    createHearts();
    
    // แสดงข้อความพิเศษ
    setTimeout(() => {
        const loveMessage = document.createElement('div');
        loveMessage.innerHTML = '🎉 เย้ๆๆ 🎉';
        loveMessage.style.cssText = `
            font-size: 2rem;
            color: #e84393;
            font-weight: bold;
            margin-top: 20px;
            animation: bounce 0.5s ease infinite alternate;
        `;
        document.querySelector('.message').appendChild(loveMessage);
        
        // เพิ่ม CSS สำหรับ bounce animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                from { transform: scale(1); }
                to { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }, 1000);
});

// สร้างหัวใจลอยเพิ่ม
function createHearts() {
    const container = document.querySelector('.floating-hearts');
    const hearts = ['💖', '💝', '💗', '💓', '💞', '💕'];
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(heart);
    }
}

// เพิ่มเอฟเฟกต์เมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // ตั้งค่าเริ่มต้นให้ปุ่ม "ไม่"
    noBtn.style.position = 'absolute';
    // ตั้งค่าตำแหน่งเริ่มต้นหลังจากโหลดหน้าเว็บเสร็จ
    setTimeout(setInitialPosition, 100);
});

// ตั้งค่าตำแหน่งใหม่เมื่อรีไซส์หน้าต่าง
window.addEventListener('resize', setInitialPosition);
