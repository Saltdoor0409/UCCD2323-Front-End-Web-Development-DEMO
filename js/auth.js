$(document).ready(function () {
    // 1. LOCAL STORAGE
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
        $('#loginEmail').val(savedEmail);
        $('#rememberMe').prop('checked', true);
    }

    //login logic check validity and save to sessionStorage
    $('#loginForm').on('submit', function (e) {
        if (!this.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            const email = $('#loginEmail').val();
            const isRemembered = $('#rememberMe').is(':checked');

           //write or delete the remembered email to localStorage based on the checkbox
            if (isRemembered) {
                localStorage.setItem('savedEmail', email);
            } else {
                localStorage.removeItem('savedEmail');
            }

            // 写入 SessionStorage 登录令牌
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('activeUser', email);

            $('#login-btn')
                .html('<span class="spinner-border spinner-border-sm me-2"></span> Authenticating...')
                .prop('disabled', true);

            setTimeout(() => {
                alert("✅ Login Successful! Redirecting to Home...");
                window.location.href = "index.html";
            }, 1200);
            return;
        }
        $(this).addClass('was-validated');
    });

    // 3. SESSION STORAGE
    if (sessionStorage.getItem('draft_name')) $('#regName').val(sessionStorage.getItem('draft_name'));
    if (sessionStorage.getItem('draft_email')) $('#regEmail').val(sessionStorage.getItem('draft_email'));
    if (sessionStorage.getItem('draft_interest')) $('#regInterest').val(sessionStorage.getItem('draft_interest'));

    $('#regName, #regEmail, #regInterest').on('input change', function () {
        sessionStorage.setItem('draft_name', $('#regName').val());
        sessionStorage.setItem('draft_email', $('#regEmail').val());
        sessionStorage.setItem('draft_interest', $('#regInterest').val());
        $('#save-status').stop(true, true).fadeIn(200).fadeOut(1500);
    });

  
    $('#registrationForm').on('submit', function (e) {
        if (!this.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            sessionStorage.removeItem('draft_name');
            sessionStorage.removeItem('draft_email');
            sessionStorage.removeItem('draft_interest');

            alert("🎉 Registration Submitted! Please log in.");
            this.reset();
            $(this).removeClass('was-validated');
            $('#login-tab').tab('show');
            return;
        }
        $(this).addClass('was-validated');
    });
});