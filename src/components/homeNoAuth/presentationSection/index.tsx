import Link from "next/link"
import styles from "./styles.module.scss"
import { Button, Container, Row, Col } from 'reactstrap'
const PresentationSection = function () {
    return (
        <>
            <Container className="py-4">
                <Row>
                    <Col md className="d-flex flex-column justify-content-center align-items-start">
                        <p className={styles.subTitle}>TUDO SOBRE GAMES</p>
                        <p className={styles.title}>Tenha acesso as principais <br />notícias dos games.</p>
                        <p className={styles.description}>
                            Acesse o Gamers News de onde você estiver, e <br />
                            fique atualizado sobre o mundo dos games.
                        </p>
                        <Link href="/register" className={styles.href}>
                            <Button outline className={styles.btnCta}>
                                ACESSE AGORA <img src="/control.svg" alt="buttonImg" className={styles.btnImg} />
                            </Button>
                        </Link>
                    </Col>
                    <Col md>
                        <img src="/homeNoAuth/capaHomeGN.png" alt="capaGN" className={styles.capaHome} />
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center pt-5">
                    <img src="/homeNoAuth/iconArrowDown.svg" alt="arrowDown" className={styles.arrowDown}/>
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default PresentationSection