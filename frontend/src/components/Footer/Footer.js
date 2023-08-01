import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-title">Created by Ledian Fekaj</div>
                <div className="icons">
                    <a href="#" className="icon-link">
                        <i className="icon">GitHub Profile</i>
                    </a>
                </div>
                <div className="tech">
                    <ul className="tech-list">
                        <li>JavaScript</li>
                        <li>React</li>
                        <li>PostgreSQL</li>
                        <li>CSS</li>
                        <li>Redux</li>
                        <li>Express</li>
                        <li>Sequelize</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
