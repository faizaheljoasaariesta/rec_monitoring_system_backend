import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_APP_PASSWORD } from '../../config/env';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_APP_PASSWORD,
  },
});

const getVerificationEmailTemplate = (code: string): string => {
  return `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi Akun - APBD DEB SV UGM</title>
    <style>
        /* Reset styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f5f7fa;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="25" cy="75" r="1" fill="white" opacity="0.05"/><circle cx="75" cy="25" r="1" fill="white" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        }
        
        .logo-container {
            position: relative;
            z-index: 1;
        }
        
        .logo {
            width: 80px;
            height: 80px;
            background: white;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            padding: 10px;
        }
        
        .logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
            display: block;
            margin: 0 auto;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .welcome-text {
            font-size: 18px;
            color: #2c3e50;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .verification-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
            position: relative;
            overflow: hidden;
        }
        
        .verification-section::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(180deg); }
        }
        
        .verification-label {
            color: white;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
            position: relative;
            z-index: 1;
        }
        
        .verification-code {
            background: white;
            color: #2c3e50;
            font-size: 32px;
            font-weight: 800;
            letter-spacing: 8px;
            padding: 20px 30px;
            border-radius: 12px;
            margin: 15px 0;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 1;
            font-family: 'Courier New', monospace;
        }
        
        .timer-info {
            color: white;
            font-size: 14px;
            margin-top: 15px;
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .instructions {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            border-left: 4px solid #667eea;
        }
        
        .instructions h3 {
            color: #2c3e50;
            font-size: 18px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .instructions ul {
            list-style: none;
            padding: 0;
        }
        
        .instructions li {
            margin-bottom: 12px;
            padding-left: 25px;
            position: relative;
            color: #555;
        }
        
        .instructions li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #667eea;
            font-weight: bold;
        }
        
        .footer {
            background: #2c3e50;
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .footer-content {
            max-width: 400px;
            margin: 0 auto;
        }
        
        .footer h4 {
            font-size: 16px;
            margin-bottom: 10px;
            color: #ecf0f1;
        }
        
        .footer p {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 20px;
        }
        
        .warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            color: #856404;
            font-size: 14px;
            text-align: center;
        }
        
        /* Responsive Design */
        @media only screen and (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 8px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .verification-code {
                font-size: 28px;
                letter-spacing: 6px;
                padding: 18px 20px;
            }
            
            .footer {
                padding: 25px 20px;
            }
        }
        
        @media only screen and (max-width: 480px) {
            .verification-code {
                font-size: 24px;
                letter-spacing: 4px;
                padding: 15px;
            }
            
            .header h1 {
                font-size: 22px;
            }
            
            .logo {
                width: 70px;
                height: 70px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo-container">
                <div class="logo">
                    <img src="https://bprugm.co.id/wp-content/uploads/2018/03/cropped-Simbol-Logo-Garis.png" alt="Logo UGM" />
                </div>
                <h1>APBD OpenSource</h1>
                <p>Departemen Ekonomika dan Bisnis - Sekolah Vokasi</p>
            </div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="welcome-text">
                Selamat datang di platform APBD OpenSource DEB SV UGM! Untuk melanjutkan, silakan verifikasi akun Anda.
            </div>
            
            <!-- Verification Section -->
            <div class="verification-section">
                <div class="verification-label">Kode Verifikasi Anda</div>
                <div class="verification-code">${code}</div>
                <div class="timer-info">
                    ⏰ &nbsp; Berlaku selama 10 menit
                </div>
            </div>
            
            <!-- Instructions -->
            <div class="instructions">
                <h3>📋 &nbsp; Cara Menggunakan Kode</h3>
                <ul>
                    <li>1. Salin kode verifikasi di atas</li>
                    <li>2. Kembali ke halaman pendaftaran</li>
                    <li>3. Masukkan kode pada kolom yang tersedia</li>
                    <li>4. Klik tombol "Verifikasi" untuk mengaktifkan akun</li>
                </ul>
            </div>
            
            <!-- Warning -->
            <div class="warning">
                <strong>⚠️ Penting:</strong> Jangan bagikan kode ini kepada siapapun. Tim UGM tidak akan pernah meminta kode verifikasi Anda melalui telepon atau email.
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-content">
                <h4>Departemen Ekonomika dan Bisnis</h4>
                <p>Sekolah Vokasi - Universitas Gadjah Mada</p>
                <p>Jika Anda mengalami kesulitan, hubungi tim support kami di faizaheljoasaariesta@mail.ugm.ac.id</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

export const sendVerificationEmail = async (to: string, code: string): Promise<void> => {
  const mailOptions = {
    from: `"APBD DEB SV UGM - Verifikasi Akun" <${EMAIL_USER}>`,
    to,
    subject: '🔐 Kode Verifikasi Akun APBD OpenSource UGM',
    html: getVerificationEmailTemplate(code),
    text: `
Verifikasi Akun APBD OpenSource UGM

Selamat datang di platform APBD OpenSource UGM!

Kode Verifikasi Anda: ${code}

Kode ini berlaku selama 10 menit.

Cara menggunakan:
1. Salin kode verifikasi di atas
2. Kembali ke halaman pendaftaran
3. Masukkan kode pada kolom yang tersedia
4. Klik tombol "Verifikasi" untuk mengaktifkan akun

PENTING: Jangan bagikan kode ini kepada siapapun.

Departemen Ekonomika dan Bisnis
Sekolah Vokasi - Universitas Gadjah Mada

Jika mengalami kesulitan, hubungi: faizaheljoasaariesta@mail.ugm.ac.id
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error mengirim email verifikasi:', error);
    throw new Error('Gagal mengirim email verifikasi');
  }
};