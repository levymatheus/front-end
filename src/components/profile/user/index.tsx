import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import styles from '../../../../styles/profile.module.scss'

const UserForm = function () {
    return <>
        <Form className={styles.form}>
            <div className={styles.formName}>
                <p className={styles.nameAbbreviation}>NT</p>
                <p className={styles.userName}>NAME TEST</p>
            </div>
            <div className={styles.memberTime}>
                <img src='/logoGamersNews.png' alt='iconProfile' className={styles.memberTimeImg} />
                <p className={styles.memberTimeText}>Membro desde <br /> 20 de Abril de 2024</p>
            </div>
            <hr />
         <div className={styles.inputFlexDiv}>
         <FormGroup>
                <Label  className={styles.label} for="firstName">
                    NOME
                </Label>
                <Input name='fistName' type='text' id='firstName' placeholder='Digite o seu primeiro nome' required maxLength={60} className={styles.inputFlex} value={"Name"}/>
            </FormGroup>
            <FormGroup>
                <Label  className={styles.label} for="lastName">
                    SOBRENOME 
                </Label>
                <Input name='lastName' type='text' id='lastName' placeholder='Digite o seu sobrenome' required maxLength={60} className={styles.inputFlex} value={"Teste"}/>
            </FormGroup>
         </div>
        <div className={styles.inputNormalDiv}>
        <FormGroup>
                <Label  className={styles.label} for="phone">
                    CELULAR
                </Label>
                <Input name='phone' type='tel' id='phone' placeholder='(xx) 9xxxx-xxxx' required className={styles.input} value={"+55 (69) 99999-9999 "}/>
            </FormGroup>
            <FormGroup>
                <Label className={styles.label} for='email'>
                    E-MAIL
                </Label>
                <Input name='email' type='email' id='email' placeholder='Digite o seu e-mail' required className={styles.input} value={"testeemail@gmail.com"}/>
            </FormGroup>
            <Button className={styles.formBtn} outline type='submit'>Salvar alterações</Button>
        </div>
        </Form>
    </>
}

export default UserForm