import styles from '../styles/registerLogin.module.scss';
import Head from 'next/head';
import HeaderGeneric from '@/src/components/common/headerGeneric';
import { Container } from 'reactstrap';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Footer from '@/src/components/common/footer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ToastComponent from '@/src/components/common/toast';
import authService from '@/src/services/authService';

const Login = function () {
    const router = useRouter();
    const [toastColor, setToastColor] = useState("");
    const [toastIsOpen, setToastIsOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        const registerSucess = router.query.registred;
        if (registerSucess === 'true') {
            setToastColor("bg-success");    
            setToastIsOpen(true);
            setTimeout(() => {
                setToastIsOpen(false);
            }, 1000 * 3)
            setToastMessage("Cadastro realizado com sucesso!");
        }
    }, [router.query]);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email')!.toString();
        const password = formData.get('password')!.toString();
        const params = { email, password };

        const { status } = await authService.login(params);

        if (status === 200) {
            router.push('/home');
        } else {
            setToastColor("bg-danger");    
            setToastIsOpen(true);
            setTimeout(() => {
                setToastIsOpen(false);
            }, 1000 * 3)
            setToastMessage("E-mail ou senha inválidos!");
        }
    }


    return <>
        <Head>
            <title>Gamers News - Login</title>
            <link rel="shortcut icon" href="/favicon_io/favicon.ico" type="image/x-icon" />
        </Head>
        <main className={styles.main}>
            <HeaderGeneric logoUrl='/' btnUrl='/register' btnContent='Registrar' />
            <Container className="py-5">
                <p className={styles.formTitle}>Bem-vindo(a) ao Gamers News!</p>
                <Form className={styles.form} onSubmit={handleLogin}>
                    <p className='text-center'>
                        <strong>Faça login para acessar o Gamers News!</strong>
                    </p>
                    <FormGroup>
                        <Label for="email" className={styles.label}>E-mail</Label>
                        <Input type="email" name="email" id="email" placeholder='Digite o seu e-mail' className={styles.input} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className={styles.label}>Senha</Label>
                        <Input type="password" name="password" id="password" placeholder='Digite a sua senha' className={styles.input} required />
                    </FormGroup>
                    <Button type='submit' outline className={styles.formBtn}>ENTRAR</Button>

                </Form>
                <ToastComponent isOpen={toastIsOpen} message={toastMessage} color={toastColor} />
            </Container>
            <Footer />
        </main>
    </>
}

export default Login;