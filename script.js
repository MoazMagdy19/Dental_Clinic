const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const burger = document.getElementById('burger');
burger?.addEventListener('click', () => {
  const nav = document.querySelector('.topbar nav');
  nav?.classList.toggle('open');
  if (nav?.classList.contains('open')) {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.background = '#fff';
    nav.style.position = 'absolute';
    nav.style.top = '60px';
    nav.style.right = '4%';
    nav.style.padding = '10px';
    nav.style.boxShadow = '0 10px 30px rgba(2,8,23,.12)';
    nav.style.border = '1px solid #e2e8f0';
    nav.style.borderRadius = '12px';
    nav.style.zIndex = '40';
  } else {
    nav.removeAttribute('style');
  }
});

const form = document.getElementById('bookingForm');
const dialog = document.getElementById('confirmDialog');
const summary = document.getElementById('summary');
const waLink = document.getElementById('waLink');

const statusSelect = document.getElementById("status");
const serviceSelect = document.getElementById("service");

statusSelect?.addEventListener("change", function () {
  if (this.value === "follow") {
    serviceSelect.disabled = false; 
  } else {
    serviceSelect.disabled = true; 
    serviceSelect.value = "";      
  }
});

const WHATSAPP_NUMBER = '201099529496';

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  if (!data.name || !data.phone || !data.status || !data.date || !data.time) {
    alert('من فضلك أكمل كل الحقول المطلوبة.');
    return;
  }
  if (data.status === "follow" && !data.service) {
    alert('من فضلك اختر الخدمة المطلوبة للمتابعة.');
    return;
  }

  const msg = `حجز جديد:
الاسم: ${data.name}
الهاتف: ${data.phone}
المكان: ${data.area}
الحالة: ${data.status === "new" ? "كشف جديد" : "متابعة"}
الخدمة: ${data.status === "new" ? "-" : data.service}
التاريخ: ${data.date}
الساعة: ${data.time}
ملاحظات: ${data.notes || '-'} `;

  summary.textContent = msg;
  const encoded = encodeURIComponent(msg);
  waLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  dialog?.showModal();
});
document.querySelectorAll('.topbar nav a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.querySelector('.topbar nav');
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      nav.removeAttribute('style'); 
    }
  });
});
window.addEventListener("scroll", function () {
  const nav = document.querySelector('.topbar nav'); 
  if (nav.classList.contains("open")) {
    nav.classList.remove("open");
    nav.removeAttribute("style");
  }
});
const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");      
  if (this.value.length > 11) {
    this.value = this.value.slice(0, 11);    
  }
});
