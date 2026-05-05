

export default function Letter() {
  const handleDownload = () => {
    const element = document.getElementById('cover-letter-content');
    const opt = {
      margin: 0.75,
      filename: 'Edgar_Lorsch_Cover_Letter_Softclans_Aviation.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    if (window.html2pdf) {
      window.html2pdf().set(opt).from(element).save();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = () => {
        window.html2pdf().set(opt).from(element).save();
      };
      document.head.appendChild(script);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Action Buttons */}
        <div className="flex gap-4 mb-6 print:hidden">
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium shadow-lg"
          >
            📥 Download as PDF
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium shadow-lg"
          >
            🖨️ Print
          </button>
        </div>

        {/* Cover Letter Content */}
        <div
          id="cover-letter-content"
          className="bg-white shadow-2xl rounded-lg p-12 print:shadow-none print:rounded-none print:p-16"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {/* Header */}
          <div className="mb-6 page-break-avoid">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">EDGAR LORSCH</h1>
            <div className="text-sm text-slate-600 space-y-1">
              <p>Nairobi, Kenya</p>
              <p>📧 edgarlorsch00@gmail.com | 📱 +254114483839</p>
              <p>
                <a href="https://github.com/elorschDev1" className="text-sky-600 hover:underline print:text-black">
                  GitHub: elorschDev1
                </a>
                {' | '}
                <a href="https://www.linkedin.com/in/edgar-lorsch-972655239/" className="text-sky-600 hover:underline print:text-black">
                  LinkedIn
                </a>
              </p>
            </div>
          </div>

          <div className="text-sm text-slate-600 mb-6">
            {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>

          {/* Recipient */}
          <div className="mb-6 text-slate-700 page-break-avoid">
            <p className="font-semibold">Hiring Manager</p>
            <p>Softclans Technologies Limited</p>
            <p>Aviation Systems Team</p>
            <p>Nairobi, Kenya</p>
          </div>

          {/* Salutation */}
          <div className="mb-4">
            <p className="text-slate-800">Dear Hiring Manager,</p>
          </div>

          {/* Body - Keep it SHORT (150-200 words as requested) */}
          <div className="text-slate-700 leading-relaxed text-justify">
            <p className="mb-3 page-break-avoid">
              I am writing to apply for the Software Developer Intern position on your Aviation Systems team. As a recent BSc Information Technology graduate with hands-on experience in PHP/Laravel and React development, I am excited about the opportunity to build production features for systems that power African aviation operations.
            </p>

            <p className="mb-3 page-break-avoid">
              What draws me to aviation systems is the critical nature of the work—software reliability directly impacts safety and operations. I am eager to learn from experienced developers in a high-stakes industry where attention to detail, thorough testing, and quality code are paramount. Working on aviation systems would challenge me to elevate my development standards while contributing to infrastructure that connects our continent.
            </p>

            <p className="mb-3 page-break-avoid">
              I hope to learn professional software engineering practices including comprehensive testing strategies, database optimization for mission-critical systems, code review processes in regulated industries, and collaborative development workflows in production environments. I am committed to shipping quality code, learning from feedback, and growing into a developer who can be trusted with systems where reliability truly matters.
            </p>
          </div>

          {/* Closing */}
          <div className="mt-6 page-break-avoid">
            <p className="text-slate-800 mb-16">Sincerely,</p>
            <p className="text-slate-800 font-semibold">Edgar Lorsch</p>
          </div>

          {/* Note about attachments */}
          <div className="mt-8 pt-4 border-t border-slate-200 page-break-avoid">
           
        
          </div>
        </div>

        {/* Instructions */}
        
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          .print\\:p-16 {
            padding: 1in !important;
          }
          .print\\:text-black {
            color: black !important;
          }
          .page-break-avoid {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          @page {
            margin: 0.75in;
            size: letter;
          }
          p {
            orphans: 3;
            widows: 3;
          }
        }
      `}</style>
    </div>
  );
}