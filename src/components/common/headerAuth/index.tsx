import { Container, Form, Input } from 'reactstrap';
import styles from './styles.module.scss';
import Link from 'next/link';
import Modal from 'react-modal';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { profile } from 'console';
import profileService from '@/src/services/profileService';

Modal.setAppElement('#__next')

const HeaderAuth = function () {
const router = useRouter()   
const [modalOpen, setModalOpen] = useState(false)
const [initials, setInitials] = useState('')

useEffect(() => {
    profileService.fetchCurrent().then((user) => {
        setInitials(user.firstName.slice(0, 1).toUpperCase() + user.lastName.slice(0, 1).toUpperCase())
    })
}, [])

const handleOpenModal = () => {
    setModalOpen(true)
}

const handleCloseModal = () => {
    setModalOpen(false)
}
const handleLogout = () => {
    sessionStorage.clear()
    router.push('/')
}

    return <>
    <Container className={styles.nav} >
        <Link href="/home">
        <img src="/gamersNews.png" alt="logoGamersNews" className={styles.imgLogoNav} />
        </Link>
        <div className="d-flex align-items-center">
            <Form>
                <Input type="search" name='search' placeholder="Pesquisar" className={styles.input} />
            </Form>
            <img src="/homeAuth/iconSearch.svg" alt="search" className={styles.searchImg} />
            <p className={styles.userProfile} onClick={handleOpenModal}>{initials}</p>
        </div>
        <Modal isOpen={modalOpen} onRequestClose={handleCloseModal} shouldCloseOnEsc={true} className={styles.modal} overlayClassName={styles.overlayModal}>
            <Link style={{ textDecoration: "none" }} href="/profile">
            <p className={styles.modalLink}>Meus Dados</p>
            </Link>
            <p className={styles.modalLink} onClick={handleLogout}>Sair</p>
        </Modal>

    </Container>
    </>
}

export default HeaderAuth