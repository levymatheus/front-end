import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import styles from '../../../../styles/profile.module.scss'
import { FormEvent, use, useEffect, useState } from 'react'
import { profile } from 'console'
import profileService from '@/src/services/profileService'
import ToastComponent from '../../common/toast'

const PasswordForm = function () {

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [color, setColor] = useState('')

    useEffect(() => {
        profileService.fetchCurrent().then((password) => {
            setCurrentPassword(password.currentPassword)
            setNewPassword(password.newPassword)
        })

    }, [])

    const handlePasswordUpdate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (newPassword !== confirmNewPassword) {
            setToastIsOpen(true)
            setColor('bg-danger')
            setErrorMessage('A senha atual não confere com a de login!')
            setTimeout(() => setToastIsOpen(false), 3000)
            return
        }

        if (currentPassword === newPassword) {
            setToastIsOpen(true)
            setColor('bg-danger')
            setErrorMessage('A nova senha não pode ser igual a atual!')
            setTimeout(() => setToastIsOpen(false), 3000)
            return
        }

        const res = await profileService.passwordUpdate({
            currentPassword,
            newPassword
        })

        if (res === 204) {
            setToastIsOpen(true)
            setColor('bg-success')
            setErrorMessage('Senha atualizada com sucesso!')
            setTimeout(() => setToastIsOpen(false), 3000)
             
            setCurrentPassword('')
            setNewPassword('')
            setConfirmNewPassword('')
        }

        if (res === 400) {
            setToastIsOpen(true)
            setColor('bg-danger')
            setErrorMessage('Senha atual incorreta!')
            setTimeout(() => setToastIsOpen(false), 3000)
        }

    }

    return <>
    <Form onSubmit={handlePasswordUpdate} className={styles.form}>
    <div className={styles.inputNormalDiv}>
        <FormGroup>
            <Label className={styles.label} for='currentPassword'>SENHA ATUAL</Label>
            <Input
            name='currentPassword'
            type='password'
            id='currentPassword'
            placeholder='****** (min. 6 caracteres)'
            required
            minLength={6}
            maxLength={12}
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.currentTarget.value)}
            className={styles.input}
            />
        </FormGroup>
    </div>
    <div className={styles.inputFlexDiv}>
    <FormGroup>
        <Label className={styles.label} for='newPassword'>NOVA SENHA</Label>
        <Input
        name='newPassword'
        type='password'
        id='newPassword'
        placeholder='****** (min. 6 caracteres)'
        required
        minLength={6}
        maxLength={12}
        value={newPassword}
        onChange={(event) => setNewPassword(event.currentTarget.value)}
        className={styles.inputFlex}
        />
    </FormGroup>
    <FormGroup>
        <Label className={styles.label} for='confirmNewPassword'>CONFIRMAR NOVA SENHA</Label>
        <Input
        name='confirmNewPassword'
        type='password'
        id='confirmNewPassword'
        placeholder='******'
        required
        minLength={6}
        maxLength={12}
        value={confirmNewPassword}
        onChange={(event) => setConfirmNewPassword(event.currentTarget.value)}
        className={styles.inputFlex}
        />
    </FormGroup>
    </div>
    <Button className={styles.formBtn} outline type='submit'>Alterar Senha</Button>
    </Form>
    <ToastComponent isOpen={toastIsOpen} message={errorMessage} color={color} />
    </>
}

export default PasswordForm