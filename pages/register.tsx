import HeaderGeneric from '@/src/components/common/headerGeneric';
import styles from '../styles/registerLogin.module.scss';
import Head from 'next/head';
import { Container, Form, FormGroup, Label, Input, Button, Toast } from 'reactstrap';
import Footer from '@/src/components/common/footer';
import { FormEvent, useState } from 'react';
import authService from '@/src/services/authService';
import {useRouter} from 'next/router';
import ToastComponent from '@/src/components/common/toast';


const Register = function () {
const router = useRouter();
const [toastIsOpen, setToastIsOpen] = useState(false);
const [toastMessage, setToastMessage] = useState("");

const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get('firstName')!.toString();
    const lastName = formData.get('lastName')!.toString();
    const email = formData.get('email')!.toString();
    const phone = formData.get('phone')!.toString();
    const birth = formData.get('birth')!.toString();
    const password = formData.get('password')!.toString();
    const confirmPassword = formData.get('confirmPassword')!.toString();
    const params = {firstName, lastName, email, phone, birth, password};
    
    if(password !== confirmPassword) {
        setToastIsOpen(true);
        setTimeout(() => {
            setToastIsOpen(false);
        }, 1000 * 3 )
        setToastMessage("A sua senha não está igual a senha de confirmação!");
        return;
    }

    const {data, status} = await authService.register(params);

    if(status === 201) {
        router.push('/login?registred=true');
    } else {
        setToastIsOpen(true);
        setTimeout(() => {
            setToastIsOpen(false);
        }, 1000 * 3 )
        setToastMessage(data.message);
    }
    
}

    return (
        <>
            <Head>
                <title>Gamers News - Registro</title>
                <link rel="shortcut icon" href="/favicon_io/favicon.ico" type="image/x-icon" />
                <script src="https://jsuites.net/v5/jsuites.js"></script>
            </Head>
            <main className={styles.main}>
                <HeaderGeneric logoUrl='/' btnUrl='/login' btnContent='Fazer login' />
                <Container className="py-5">
                    <p className={styles.formTitle}>Bem-vindo(a) ao Gamers News!</p>
                    <Form className={styles.form} onSubmit={handleRegister}> 
                        <p className="text-center"><strong>Faça a sua conta!</strong></p>
                        <FormGroup> 
                            <Label for="firstName" className={styles.label}>Nome</Label>
                            <Input type="text" name="firstName" id="firstName" placeholder="Digite o seu primeiro nome" required maxLength={30} className={styles.inputName} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName" className={styles.label}>Sobrenome</Label>
                            <Input type="text" name="lastName" id="lastName" placeholder="Digite o seu sobrenome" required maxLength={30} className={styles.inputName} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone" className={styles.label}>Celular</Label>
                            <Input type="tel" name="phone" id="phone" placeholder="(xx) 9xxxx-xxxx" data-mask="[-]+55 (00) 00000-0000" required className={styles.input} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email" className={styles.label}>E-mail</Label>
                            <Input type="email" name="email" id="email" placeholder="Digite o seu e-mail" required className={styles.input} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="birth" className={styles.label}>Data de nascimento</Label>
                            <Input type="date" name="birth" id="birth" min="1930-01-01" max='2024-12-31' required className={styles.input} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" className={styles.label}>Crie uma senha</Label>
                            <Input type="password" name="password" id="password" placeholder="Crie a sua senha - Mínimo 6 caractéres" required min={6} className={styles.input} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword" className={styles.label}>Confirme a sua senha</Label>
                            <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirme a sua senha" required min={6} className={styles.input} />
                        </FormGroup>
                      <Button type='submit' outline className={styles.formBtn}>CADASTRAR</Button>
                    </Form>
                </Container>
                <Footer />
                <ToastComponent isOpen={toastIsOpen} message={toastMessage} color="bg-danger" />
            </main>
        </>)
}

export default Register;