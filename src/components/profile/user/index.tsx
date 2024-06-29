import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import styles from '../../../../styles/profile.module.scss'
import { FormEvent, use, useEffect, useState } from 'react'
import profileService from '@/src/services/profileService'
import ToastComponent from '../../common/toast'
import { useRouter } from 'next/router'

const UserForm = function () {
    const router = useRouter()
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [color, setColor] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [initialEmail, setInitialEmail] = useState("")
    const [created_at, setCreated_at] = useState('')
    const date = new Date(created_at)
    const month = date.toLocaleDateString("default", { month: "long" })

    useEffect(() => {

        profileService.fetchCurrent().then((user) => {
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setPhone(user.phone)
            setEmail(user.email)
            setInitialEmail(user.email)
            setCreated_at(user.createdAt)
        })


    }, [])

    const handleUserUpdate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const res = await profileService.userUpdate({
            firstName,
            lastName,
            phone,
            email,
            created_at
        })

        if (res === 200) {
            setToastIsOpen(true)
            setColor('bg-success')
            setErrorMessage('Dados atualizados com sucesso!')
            setTimeout(() => setToastIsOpen(false), 3000)
            if (email !== initialEmail) {
                sessionStorage.clear()
                router.push('/login')
            }
        } else {
            setToastIsOpen(true)
            setColor('bg-danger')
            setErrorMessage('E-mail não disponível par o usuário atual!')
            setTimeout(() => setToastIsOpen(false), 3000)
        }
    }

    return <>
        <Form onSubmit={handleUserUpdate} className={styles.form}>
            <div className={styles.formName}>
                <p className={styles.nameAbbreviation}>{
                    firstName.slice(0, 1).toUpperCase() + lastName.slice(0, 1).toUpperCase()
                }
                </p>
                <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
            </div>
            <div className={styles.memberTime}>
                <img src='/logoGamersNews.png' alt='iconProfile' className={styles.memberTimeImg} />
                <p className={styles.memberTimeText}>Membro desde <br /> {`${date.getDate()} de ${month} de ${date.getFullYear()}`}</p>
            </div>
            <hr />
            <div className={styles.inputFlexDiv}>
                <FormGroup>
                    <Label className={styles.label} for="firstName">
                        NOME
                    </Label>
                    <Input name='fistName' type='text' id='firstName' placeholder='Digite o seu primeiro nome' required maxLength={60} className={styles.inputFlex} value={firstName}
                        onChange={(event) => { setFirstName(event.target.value) }} />
                </FormGroup>
                <FormGroup>
                    <Label className={styles.label} for="lastName">
                        SOBRENOME
                    </Label>
                    <Input name='lastName' type='text' id='lastName' placeholder='Digite o seu sobrenome' required maxLength={60} className={styles.inputFlex} value={lastName}
                        onChange={(event) => { setLastName(event.target.value) }} />
                </FormGroup>
            </div>
            <div className={styles.inputNormalDiv}>
                <FormGroup>
                    <Label className={styles.label} for="phone">
                        CELULAR
                    </Label>
                    <Input name='phone' type='tel' id='phone' placeholder='(xx) 9xxxx-xxxx' required className={styles.input} value={phone}
                        onChange={(event) => { setPhone(event.target.value) }} />
                </FormGroup>
                <FormGroup>
                    <Label className={styles.label} for='email'>
                        E-MAIL
                    </Label>
                    <Input name='email' type='email' id='email' placeholder='Digite o seu e-mail' required className={styles.input} value={email}
                        onChange={(event) => { setEmail(event.target.value) }} />
                </FormGroup>
                <Button className={styles.formBtn} outline type='submit'>Salvar alterações</Button>
            </div>
        </Form>
        <ToastComponent isOpen={toastIsOpen} message={errorMessage} color={color} />
    </>
}

export default UserForm