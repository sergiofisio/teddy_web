import { getClients } from "@/service/clienteService";
import { Box, Grid, Text, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Card from "../card";
import CustomSelect from "./../customSelect/index";
import Pagination from "../pagination";
import ButtonComponent from "../button";
import Modal from "../modal";

type ModalType = "criar" | "editar" | "delete" | "";

export default function Clientes({
  handleCloseSidebar,
}: {
  handleCloseSidebar: any;
}) {
  const [clientes, setClientes] = useState([]);
  const [modal, setModal] = useState<{ type: ModalType; id: number }>({
    type: "",
    id: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage, setClientsPerPage] = useState(16);

  const totalPages = Math.ceil(clientes.length / clientsPerPage);
  const startIndex = (currentPage - 1) * clientsPerPage;
  const endIndex = startIndex + clientsPerPage;
  const clientesExibidos = clientes.slice(startIndex, endIndex);

  const loadClientes = async () => {
    const clientesSelecionados = JSON.parse(
      localStorage.getItem("clientesSelecionados") || "[]"
    );
    try {
      const data = await getClients();
      const clientesAtualizados = data.map((cliente: any) => ({
        ...cliente,
        selecionado: clientesSelecionados.some((c: any) => c.id === cliente.id),
      }));

      setClientes(clientesAtualizados);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadClientes();
  }, [modal]);

  return (
    <Box
      onClick={handleCloseSidebar}
      className="h-full w-full flex flex-col !p-10"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="xl">
          <strong>{clientes.length}</strong> clientes encontrados:
        </Text>
        <Flex align="center">
          <Text mr={2}>Clientes por página:</Text>
          <CustomSelect
            options={[8, 16, 24, 32]}
            value={clientsPerPage}
            onChange={(value) => setClientsPerPage(value)}
          />
        </Flex>
      </Flex>

      <Grid
        templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
        gap={4}
        justifyContent="center"
      >
        {clientesExibidos.map((client: any) => (
          <Card key={client.id} setModal={setModal} cliente={client} />
        ))}
      </Grid>

      <Flex justify="center" mt={6}>
        <ButtonComponent
          text="Criar Cliente"
          className="w-full h-10 !bg-transparent !text-orange !border-2 !border-orange hover:!bg-orange hover:!text-white transition-all duration-300 ease-in-out"
          type="button"
          loading={false}
          action={() => setModal({ ...modal, type: "criar" })}
        />
      </Flex>

      {clientes.length > clientsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
      {(modal.type === "criar" || modal.type === "editar") && (
        <Modal
          type={modal.type}
          setModal={setModal}
          id={modal.type === "criar" ? null : modal.id}
        />
      )}
      {modal.type === "delete" && (
        <Modal type={modal.type} setModal={setModal} id={modal.id} />
      )}
    </Box>
  );
}
