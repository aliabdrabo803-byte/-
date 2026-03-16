// ننتظر حتى يتم تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. كود تصفية البورتفوليو (Portfolio Filter) ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // إزالة الكلاس النشط من كل الأزرار وإضافته للزر الذي تم الضغط عليه
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const target = button.getAttribute("data-target");

            portfolioItems.forEach(item => {
                // إظهار الكل أو إظهار العناصر التي تحتوي على الكلاس المطلوب فقط
                if (target === "all" || item.classList.contains(target)) {
                    item.style.display = "block";
                    // إضافة تأثير ظهور تدريجي بسيط
                    item.style.animation = "fadeIn 0.5s ease forwards";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });


    // --- 2. كود إرسال الرسائل للإيميل (EmailJS) ---
    // تأكد من وضع Public Key في الـ HTML كما شرحنا سابقاً
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.innerHTML;

            // تغيير حالة الزر
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            submitBtn.disabled = true;

            // استبدل SERVICE_ID و TEMPLATE_ID بالقيم الخاصة بك من حسابك في EmailJS
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(function() {
                    alert('شكراً لك! تم إرسال رسالتك لشركة AMA بنجاح.');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset(); // مسح البيانات بعد الإرسال
                }, function(error) {
                    alert('حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى لاحقاً.');
                    console.log('FAILED...', error);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }


    // --- 3. تأثير النعومة عند التنقل (Smooth Scrolling) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // طرح 70 بكسل لتعويض ارتفاع الناف بار
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- 4. تغيير خلفية الناف بار عند التمرير (Navbar Scroll Effect) ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = '#ffffff';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

});

// إضافة تأثير الـ fadeIn للصور برمجياً
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);