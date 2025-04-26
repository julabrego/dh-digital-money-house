import Button from "@/components/common/Button";

const LoginPage = () => {
    const error = true;
    return (
        <main className="form-container">
            <h1 className="text-[20px] text-center">¡Hola! Ingresá tu e-mail</h1>
            <input type="email" placeholder="Correo electrónico" />
            <Button mode="primary">Continuar</Button>
            <Button mode="tertiary">Crear cuenta</Button>
            {
                error && (
                    <p className="error-message text-center">Usuario inexistente. Vuelve a intentarlo</p>
                )
            }
        </main>
    )
}

export default LoginPage;