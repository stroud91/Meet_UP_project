import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-title">Created by Ledian Fekaj</div>
                <div className="icons">
                    <a href="#" className="icon-link">
                        <i className="icon">Icon Placeholder</i>
                    </a>
                </div>
                <div className="tech">
                    <ul className="tech-list">
                        <li>JavaScript</li>
                        <li>CSS</li>
                        <li>React</li>
                        <li>Redux</li>
                        <li>Express</li>
                        <li>Sequelize</li>
                        <li>PostgreSQL</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
