"use client"
import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import { FormProvider, useForm } from "react-hook-form";

const HomePage = () => {
  return (
    <main>
      <nav className="breadcrumbs">Inicio</nav>
      <section className="sumary">
        <p>Ver tarjetas</p>
        <p>Dinero disponible</p>
        <p>$100</p>
      </section>

      <section className="actions">
        <Button mode="primary">Ingresar dinero</Button>
        <Button mode="primary">Pago de servicios</Button>
      </section>

      <Filters />

      <section className="activity-log">
        <div className="activity-item">
          <div className="status">Ok</div>
          <div className="description">Pago de servicios</div>
          <div className="amount">$100</div>
          <div className="datetime">Sábado</div>
        </div>
        <footer>Ver toda tu actividad</footer>
      </section>
    </main>
  );
};

const Filters = () => {
  const methods = useForm({});

  return (
    <FormProvider {...methods}>
      <section className="filters">
        <TextInput placeholder="Buscar" name={"search"} />
      </section>
    </FormProvider>
  );
};

export default HomePage;
