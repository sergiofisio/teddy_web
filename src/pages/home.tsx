import { useState } from "react";
import InputComponent from "./../components/input/index";
import ButtonComponent from "./../components/button/index";
import { toastFail, toastSuccess } from "./../context/toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleOnSubmit() {
    try {
      if (!nome) throw new Error("Digite o seu nome!");
      toastSuccess(`Bem-vindo, ${nome}!`, 3000);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        localStorage.setItem("nome", nome);
        navigate("/login");
      }, 3000);
    } catch (error: any) {
      toastFail(error.message, 3000);
    }
  }
  return (
    <motion.main className="!flex !flex-col !items-center !justify-center !min-h-screen !min-w-screen">
      <div className="!flex !flex-col !items-center justify-center !space-y-10 w-1/3">
        <h1 className="!text-3xl">Olá, seja bem-vindo!</h1>
        <InputComponent
          label="Digite o seu nome:"
          type="text"
          onChange={(e) => setNome(e.target.value)}
          value={nome}
        />
        <ButtonComponent
          text="Entrar"
          className="!bg-[#EC6724] !text-white w-full !rounded-lg hover:!bg-[#F9A825] transition-colors duration-500 ease-in-out"
          type="submit"
          loading={loading}
          action={handleOnSubmit}
        />
      </div>
    </motion.main>
  );
}
