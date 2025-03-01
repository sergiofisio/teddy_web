import { useEffect, useState } from "react";
import {
  createClient,
  deleteClient,
  getClient,
  updateClient,
} from "./../../service/clienteService";
import close from "../../assets/icon/close.svg";
import InputComponent from "../input";
import axios from "axios";
import ButtonComponent from "../button";
import { toastFail, toastSuccess } from "@/context/toast";

export default function Modal({
  type,
  setModal,
  id,
}: {
  type: string;
  setModal: any;
  id?: number | null;
}) {
  const [infoCliente, setInfoCliente] = useState({
    nome: "",
    cpf: "",
    email: "",
    salario: null as number | null,
    telefones: [
      {
        codigo_pais: "55",
        codigo_area: "",
        numero: "",
      },
    ],
    enderecos: [
      {
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
      },
    ],
    empresas: [
      {
        nome: "",
        cnpj: "",
        valor: null as number | null,
      },
    ],
  });

  useEffect(() => {
    if (id) {
      getClientInfo();
    }
  }, [id]);

  async function hanbleSubmit() {
    console.log(infoCliente.telefones[0].codigo_area);

    try {
      if (
        infoCliente.nome === "" ||
        infoCliente.cpf === "" ||
        infoCliente.email === "" ||
        infoCliente.salario === 0 ||
        infoCliente.telefones[0].codigo_area === "" ||
        infoCliente.telefones[0].numero === "" ||
        infoCliente.enderecos[0].logradouro === "" ||
        infoCliente.enderecos[0].numero === "" ||
        infoCliente.enderecos[0].bairro === "" ||
        infoCliente.enderecos[0].cidade === "" ||
        infoCliente.enderecos[0].estado === "" ||
        infoCliente.enderecos[0].cep === "" ||
        infoCliente.empresas[0].nome === "" ||
        infoCliente.empresas[0].cnpj === "" ||
        infoCliente.empresas[0].valor === 0
      ) {
        throw new Error("Todos os campos são obrigatórios");
      }
      if (type === "criar") {
        await createClient(infoCliente);
      } else {
        await updateClient(Number(id), infoCliente);
      }

      setTimeout(() => {
        toastSuccess(
          type === "criar"
            ? "Cadastro realizado com sucesso"
            : "Cadastro atualizado com sucesso",
          3000
        );

        setModal("");
      });
    } catch (error: any) {
      console.log({ error });

      toastFail(
        error.status === 409 ? error.response.data.message : error.message,
        3000
      );
    }
  }

  async function getClientInfo() {
    try {
      const response = await getClient(Number(id));

      setInfoCliente({
        nome: response.nome,
        cpf: response.cpf,
        email: response.email,
        salario: response.salario ? Number(response.salario) : null,
        telefones:
          response.telefones.length > 0
            ? response.telefones
            : [
                {
                  codigo_pais: "55",
                  codigo_area: "",
                  numero: "",
                },
              ],
        enderecos:
          response.enderecos.length > 0
            ? response.enderecos
            : [
                {
                  logradouro: "",
                  numero: "",
                  complemento: "",
                  bairro: "",
                  cidade: "",
                  estado: "",
                  cep: "",
                },
              ],
        empresas:
          response.empresas.length > 0
            ? response.empresas
            : [
                {
                  nome: "",
                  cnpj: "",
                  valor: null,
                },
              ],
      });
    } catch (error) {
      console.error("Erro ao buscar informações do cliente:", error);
    }
  }

  async function deleteCliente() {
    try {
      await deleteClient(Number(id));
      toastSuccess("Cliente deletado com sucesso", 3000);
      setTimeout(() => {
        setModal("");
      }, 3000);
    } catch (error: any) {
      console.log(error);
    }
  }

  async function getCepInfo(cep: string) {
    const cepRefatorado = cep.replace(/\D/g, "");
    try {
      if (cepRefatorado.length < 8 || cepRefatorado.includes("_")) {
        return;
      }
      const response = await axios.get(
        `https://viacep.com.br/ws/${cepRefatorado}/json/`
      );
      setInfoCliente({
        ...infoCliente,
        enderecos: [
          {
            ...infoCliente.enderecos[0],
            logradouro: response.data.logradouro,
            bairro: response.data.bairro,
            cidade: response.data.localidade,
            estado: response.data.uf,
          },
        ],
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  if (type === "delete") {
    return (
      <div className="absolute !top-0 !left-0 !w-full !h-full !flex !items-center !justify-center !bg-black/50">
        <div>
          <div className="w-2/3 h-10/12 !bg-white flex flex-col !p-4 gap-4 rounded-xl">
            <img
              className=" w-5 absolute top-2 right-2 cursor-pointer"
              src={close}
              alt="close button"
              onClick={() => setModal("")}
            />
            <strong>
              Tem certeza que deseja excluir o cliente {infoCliente.nome}?
            </strong>
            <div className="flex justify-end gap-2">
              <ButtonComponent
                type="button"
                text="Sim"
                className="!bg-orange !text-white !p-2"
                action={() => deleteCliente()}
              />
              <ButtonComponent
                text="Nao"
                type="button"
                className="!bg-red-600 !text-white !p-2"
                action={() => {
                  setModal("");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute !top-0 !left-0 !w-full !h-full !flex !items-center !justify-center !bg-black/50 ">
      <div className="relative w-2/3 h-10/12 !bg-white flex flex-col !p-4 gap-4 rounded-xl">
        <img
          className=" w-5 absolute top-2 right-2 cursor-pointer"
          src={close}
          alt="close button"
          onClick={() => setModal("")}
        />
        <strong>{type === "criar" ? "Criar " : "Editar "}Cliente</strong>
        <form className="flex flex-col gap-4">
          <InputComponent
            label="Digite o nome"
            type="text"
            mask=""
            onChange={(e) => {
              setInfoCliente({ ...infoCliente, nome: e.target.value });
            }}
            value={infoCliente.nome}
          />
          <InputComponent
            label="Digite o email"
            type="email"
            mask=""
            onChange={(e) => {
              setInfoCliente({ ...infoCliente, email: e.target.value });
            }}
            value={infoCliente.email}
          />
          <InputComponent
            label="Digite o cpf"
            type="text"
            mask="999.999.999-99"
            onChange={(e) => {
              setInfoCliente({ ...infoCliente, cpf: e.target.value });
            }}
            value={infoCliente.cpf}
          />
          <InputComponent
            label="Digite o Salário"
            type="number"
            mask=""
            MaxLength={10}
            onChange={(e) => {
              setInfoCliente({
                ...infoCliente,
                salario: Number(e.target.value),
              });
            }}
            value={Number(infoCliente.salario)}
          />
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 !border-r-2 !pr-4">
              <div className="flex flex-col gap-4">
                <strong>Telefone</strong>
                <div className="flex gap-4">
                  <InputComponent
                    label="Digite o ddd"
                    type="number"
                    mask=""
                    onChange={(e) => {
                      setInfoCliente({
                        ...infoCliente,
                        telefones: [
                          {
                            ...infoCliente.telefones[0],
                            codigo_area: e.target.value,
                          },
                        ],
                      });
                    }}
                    value={infoCliente.telefones[0].codigo_area}
                    className="!w-1/2"
                  />
                  <InputComponent
                    label="Digite o número"
                    type="text"
                    mask="99999-9999"
                    onChange={(e) => {
                      setInfoCliente({
                        ...infoCliente,
                        telefones: [
                          {
                            ...infoCliente.telefones[0],
                            numero: e.target.value,
                          },
                        ],
                      });
                    }}
                    value={infoCliente.telefones[0].numero}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <strong>Endereço</strong>
                <div className="flex flex-col gap-4">
                  <InputComponent
                    label="Digite o CEP"
                    type="text"
                    mask="99999-999"
                    onBlur={(e) => getCepInfo(e.target.value)}
                    onChange={(e) => {
                      setInfoCliente({
                        ...infoCliente,
                        enderecos: [
                          {
                            ...infoCliente.enderecos[0],
                            cep: e.target.value,
                          },
                        ],
                      });
                    }}
                    value={infoCliente.enderecos[0].cep}
                    className="!w-1/2"
                  />
                  <div className="flex gap-4">
                    <InputComponent
                      label="Digite o logrardouro"
                      type="text"
                      mask=""
                      onChange={(e) => {
                        setInfoCliente({
                          ...infoCliente,
                          enderecos: [
                            {
                              ...infoCliente.enderecos[0],
                              logradouro: e.target.value,
                            },
                          ],
                        });
                      }}
                      value={infoCliente.enderecos[0].logradouro}
                      className="!w-full"
                    />
                    <InputComponent
                      label="Digite o número"
                      type="number"
                      mask=""
                      onChange={(e) => {
                        setInfoCliente({
                          ...infoCliente,
                          enderecos: [
                            {
                              ...infoCliente.enderecos[0],
                              numero: e.target.value,
                            },
                          ],
                        });
                      }}
                      value={Number(infoCliente.enderecos[0].numero)}
                      className="!w-1/2"
                    />
                  </div>
                  <div className="flex gap-4">
                    <InputComponent
                      label="Digite o Complemento"
                      type="text"
                      mask=""
                      onChange={(e) => {
                        setInfoCliente({
                          ...infoCliente,
                          enderecos: [
                            {
                              ...infoCliente.enderecos[0],
                              complemento: e.target.value,
                            },
                          ],
                        });
                      }}
                      value={infoCliente.enderecos[0].complemento}
                      className="!w-full"
                    />
                    <InputComponent
                      label="Digite o Bairro"
                      type="text"
                      mask=""
                      onChange={(e) => {
                        setInfoCliente({
                          ...infoCliente,
                          enderecos: [
                            {
                              ...infoCliente.enderecos[0],
                              bairro: e.target.value,
                            },
                          ],
                        });
                      }}
                      value={infoCliente.enderecos[0].bairro}
                      className="!w-full"
                    />
                  </div>
                  <div className="flex gap-4">
                    <InputComponent
                      label="Digite a cidade"
                      type="text"
                      mask=""
                      onChange={(e) => {
                        setInfoCliente({
                          ...infoCliente,
                          enderecos: [
                            {
                              ...infoCliente.enderecos[0],
                              cidade: e.target.value,
                            },
                          ],
                        });
                      }}
                      value={infoCliente.enderecos[0].cidade}
                      className="!w-full"
                    />
                    <InputComponent
                      label="Digite o Estado"
                      type="text"
                      mask=""
                      onChange={(e) => {
                        setInfoCliente({
                          ...infoCliente,
                          enderecos: [
                            {
                              ...infoCliente.enderecos[0],
                              estado: e.target.value,
                            },
                          ],
                        });
                      }}
                      value={infoCliente.enderecos[0].estado}
                      className="!w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <strong>Empresa</strong>
              <div className="flex flex-col gap-4">
                <InputComponent
                  label="Digite o nome"
                  type="text"
                  mask=""
                  onChange={(e) => {
                    setInfoCliente({
                      ...infoCliente,
                      empresas: [
                        {
                          ...infoCliente.empresas[0],
                          nome: e.target.value,
                        },
                      ],
                    });
                  }}
                  value={infoCliente.empresas[0].nome}
                  className="!w-full"
                />
                <InputComponent
                  label="Digite o CNPJ"
                  type="text"
                  mask="99.999.999/9999-99"
                  onChange={(e) => {
                    setInfoCliente({
                      ...infoCliente,
                      empresas: [
                        {
                          ...infoCliente.empresas[0],
                          cnpj: e.target.value,
                        },
                      ],
                    });
                  }}
                  value={infoCliente.empresas[0].cnpj}
                />
                <InputComponent
                  label="Digite o Valor da Empresa"
                  type="number"
                  MaxLength={18}
                  mask=""
                  onChange={(e) => {
                    setInfoCliente({
                      ...infoCliente,
                      empresas: [
                        {
                          ...infoCliente.empresas[0],
                          valor: Number(e.target.value),
                        },
                      ],
                    });
                  }}
                  value={Number(infoCliente.empresas[0].valor)}
                />
              </div>
            </div>
          </div>
          <ButtonComponent
            loading={false}
            action={() => hanbleSubmit()}
            type="button"
            className="!bg-orange !text-white !p-2"
            text={`${type === "criar" ? "Criar" : "Editar"} Cliente`}
          />
        </form>
      </div>
    </div>
  );
}
