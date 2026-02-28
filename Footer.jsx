import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>AI Travel Pro</h4>
            <p>Advanced AI-powered travel cost calculator for smart budget planning.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#calculator">Calculator</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#testimonials">Reviews</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Destinations</h4>
            <ul>
              <li><a href="#">Dubai</a></li>
              <li><a href="#">Abu Dhabi</a></li>
              <li><a href="#">International</a></li>
              <li><a href="#">Popular Cities</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} AI Travel Calculator Pro. All rights reserved.</p>
          <p className="footer-note">Powered by Advanced AI • No data stored • 100% Private</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
