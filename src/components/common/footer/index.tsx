import { Container } from 'reactstrap';
import styles from './styles.module.scss';


const Footer = function () {
    return <>
   <Container className={styles.footer}>
    <img src="/logoGamersNews.png" alt="logoFooter" className={styles.footerLogo}/>
    <a href="http://gamersnews.com" target={"_blank"} className={styles.footerLink} >GAMERSNEWS.COM</a>
   </Container>
    </>
}

export default Footer;