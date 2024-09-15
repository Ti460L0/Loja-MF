import customtkinter as ct
from tkinter import messagebox
from ..database.db_connection import connect_db

class ConsultaCliente(ct.CTk):
    def __init__(self):
        super().__init__()

        self.title("Loja-MF")

        # APAGAR ANTES DA VERSÃO FINAL
        self.bind("<Escape>", lambda event: self.destroy())

        # Iniciar centralizado
        screen_width = self.winfo_screenwidth()
        screen_height = self.winfo_screenheight()
        x = int((screen_width / 2) - (1400 / 2))
        y = int((screen_height / 2) - (780 / 2))
        self.geometry(f"800x400+{x}+{y}")

        # Conf da barra de janela
        self.overrideredirect(True)
        validate_cmd = self.register(self.validate_entry)

        # Frame das entradas
        self.entradas_frame = ct.CTkFrame(self)
        self.entradas_frame.place(relx=0.5, rely=0.5, anchor='center')

        # Botão de consulta
        self.consultar_button = ct.CTkButton(self.entradas_frame, text="Consultar", command=self.consultar)
        self.consultar_button.grid(row=2, column=1, padx=10, pady=10)

        # Nome 
        self.name_label = ct.CTkLabel(self.entradas_frame, text='Nome:')
        self.name_label.grid(row=0, column=0, pady=10)
        self.name_entry = ct.CTkEntry(self.entradas_frame, width=200)
        self.name_entry.grid(row=0, column=1, pady=10)
        
        # CPF
        self.cpf_label = ct.CTkLabel(self.entradas_frame, text='CPF:') 
        self.cpf_label.grid(row=1, column=0, padx=10, pady=10)
        self.cpf_entry = ct.CTkEntry(self.entradas_frame, width=200, validate='key', validatecommand=(validate_cmd, '%P', '11'))
        self.cpf_entry.grid(row=1, column=1, padx=10, pady=10)

    #Consulta ao banco de dados
        def consultar(self):
            name = self.name_entry.get()
            cpf = self.cpf_entry.get()

            if not name and not cpf:
                messagebox.showerror("Erro", "Por favor, preencha pelo menos um campo.")
                return

            # Chama a função para preencher o formulário com os dados encontrados
            self.auto_fill_form(name, cpf)

        def auto_fill_form(self, name, cpf):
            conn = connect_db()
            if conn is None:
                messagebox.showerror("Erro", "Não foi possível conectar ao banco de dados.")
                return

            try:
                cursor = conn.cursor()

                # Consulta ao banco de dados
                query = "SELECT nome, rg, cpf, email, telefone, endereco, cep, bairro FROM clientes WHERE nome = %s OR cpf = %s"
                cursor.execute(query, (name, cpf))
                result = cursor.fetchone()

                if result:
                    # Preencher os campos com os dados do cliente
                    self.name_entry.delete(0, 'end')
                    self.name_entry.insert(0, result[0])  # Nome

                    self.cpf_entry.delete(0, 'end')
                    self.cpf_entry.insert(0, result[2])   # CPF

                    self.rg_entry.delete(0, 'end')
                    self.rg_entry.insert(0, result[1])  # RG

                    self.email_entry.delete(0, 'end')
                    self.email_entry.insert(0, result[3])  # Email

                    self.telefone_entry.delete(0, 'end')
                    self.telefone_entry.insert(0, result[4])  # Telefone

                    self.endereco_entry.delete(0, 'end')
                    self.endereco_entry.insert(0, result[5])  # Endereço

                    self.cep_entry.delete(0, 'end')
                    self.cep_entry.insert(0, result[6])  # CEP

                    self.bairro_entry.delete(0, 'end')
                    self.bairro_entry.insert(0, result[7])  # Bairro
                    
                else:
                    messagebox.showinfo("Não encontrado", "Cliente não encontrado.")

            except Exception as e:
                messagebox.showerror("Erro", f"Erro ao consultar: {e}")

            finally:
                cursor.close()
                conn.close()

        def validate_entry(self, input_value, max_length):
            if input_value.isdigit() and len(input_value) <= int(max_length):
                return True
            elif input_value == "":  # Permite apagar (deixar o campo vazio)
                return True
            else:
                return False

if __name__ == "__main__":
    app = ConsultaCliente()
    app.mainloop()
