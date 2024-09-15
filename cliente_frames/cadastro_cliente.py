import customtkinter as ct
from tkinter import messagebox
from database.db_connection import connect_db

class CadastroCliente(ct.CTkFrame):
    def __init__(self, master=None):
        super().__init__(master)
        
        # HotKeys
        self.master.bind("<Return>", self.submit_form)
        self.master.bind("<Escape>", lambda event: self.master.destroy())

        # Validar campos
        validate_cmd = self.register(self.validate_entry)

        ### FRAMES ###

        # Main Frame
        self.main_frame = ct.CTkFrame(self.master, border_color="darkgoldenrod", border_width=5, corner_radius=10)
        self.main_frame.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)

        # Frame do Titulo
        self.title_frame = ct.CTkFrame(self.main_frame, height=50, corner_radius=10)
        self.title_frame.pack(side="top", fill="x", padx=20, expand=True)

        # Frame das entradas
        self.entradas_frame = ct.CTkFrame(self.main_frame)
        self.entradas_frame.pack(side="top", fill="x", padx=20, expand=True)


        # Titulo
        self.title_label = ct.CTkLabel(self.title_frame, text="Cadastrar cliente", font=("Arial", 20))
        self.title_label.pack(side="left", padx=10, pady=10)

        # Nome
        self.name_label = ct.CTkLabel(self.entradas_frame, text='Nome:')
        self.name_label.grid(row=0, column=0, pady=10)
        self.name_entry = ct.CTkEntry(self.entradas_frame, width=200)
        self.name_entry.grid(row=0, column=1, pady=10)

        # CPF
        self.cpf_label = ct.CTkLabel(self.entradas_frame, text='CPF:')
        self.cpf_label.grid(row=1, column=2, padx=10, pady=10)
        self.cpf_entry = ct.CTkEntry(self.entradas_frame, width=200, validate='key', validatecommand=(validate_cmd, '%P', '11'))
        self.cpf_entry.grid(row=1, column=3, padx=10, pady=10)

        # E-mail 
        self.email_label = ct.CTkLabel(self.entradas_frame, text='E-mail:')
        self.email_label.grid(row=0, column=2, padx=10, pady=10)
        self.email_entry = ct.CTkEntry(self.entradas_frame, width=200)
        self.email_entry.grid(row=0, column=3, padx=10, pady=10)

        # Telefone
        self.telefone_label = ct.CTkLabel(self.entradas_frame, text='Telefone:')
        self.telefone_label.grid(row=2, column=0, padx=10, pady=10)
        self.telefone_entry = ct.CTkEntry(self.entradas_frame, width=200)
        self.telefone_entry.grid(row=2, column=1, padx=10, pady=10)

        # Endereço
        self.endereco_label = ct.CTkLabel(self.entradas_frame, text='Endereço:')
        self.endereco_label.grid(row=2, column=2, padx=10, pady=10)
        self.endereco_entry = ct.CTkEntry(self.entradas_frame, width=200)
        self.endereco_entry.grid(row=2, column=3, padx=10, pady=10)

        # Cep
        self.cep_label = ct.CTkLabel(self.entradas_frame, text='CEP:')
        self.cep_label.grid(row=3, column=0, padx=10, pady=10)
        self.cep_entry = ct.CTkEntry(self.entradas_frame, width=200, validate='key', validatecommand=(validate_cmd, '%P', '8'))
        self.cep_entry.grid(row=3, column=1, padx=10, pady=10)

        # Bairro
        self.bairro_label = ct.CTkLabel(self.entradas_frame, text='Bairro:')
        self.bairro_label.grid(row=3, column=2, padx=10, pady=10)
        self.bairro_entry = ct.CTkEntry(self.entradas_frame, width=200)
        self.bairro_entry.grid(row=3, column=3, padx=10, pady=10)

        # Observações
        self.observacoes_label = ct.CTkLabel(self.entradas_frame, text='Observações:')
        self.observacoes_label.grid(row=4, column=0, padx=10, pady=10)
        self.observacoes_entry = ct.CTkEntry(self.entradas_frame, width=200, height=300)
        self.observacoes_entry.grid(row=4, column=1, padx=10, pady=10)

        # Submit
        self.submit_button = ct.CTkButton(self.entradas_frame, text='Cadastrar Cliente', command=self.submit_form)
        self.submit_button.grid(row=4, column=2, padx=10, pady=10)
        # Cancel
        self.cancel_button = ct.CTkButton(self.entradas_frame, text='Cancelar', command=self.master.destroy)
        self.cancel_button.grid(row=4, column=3, padx=10, pady=10)

        
    
    # Função para validar o campo RG e CPF usando uma expressão regular
    def validate_entry(self, input_value, max_length):
    
    # Verifica se o valor é numérico e se não excede o limite de caracteres
        if input_value.isdigit() and len(input_value) <= int(max_length):
            return True
        elif input_value == "":  # Permite apagar (deixar o campo vazio)
            return True
        else:
            return False
    
    # Função para validar CPF sem usar API
    def validate_cpf(self, cpf):
    # Remove caracteres não numéricos
        cpf = ''.join(filter(str.isdigit, cpf))
        
    # Verifica se o CPF possui 11 dígitos
        if len(cpf) != 11 or not cpf.isdigit():
            return False
        
    # Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
        if cpf == cpf[0] * len(cpf):
            return False

    # Cálculo do primeiro dígito verificador
        total = sum(int(cpf[i]) * (10 - i) for i in range(9))
        primeiro_digito = (total * 10) % 11
        if primeiro_digito == 10:
            primeiro_digito = 0

    # Cálculo do segundo dígito verificador
        total = sum(int(cpf[i]) * (11 - i) for i in range(10))
        segundo_digito = (total * 10) % 11
        if segundo_digito == 10:
            segundo_digito = 0

    # Verifica se os dígitos verificadores estão corretos
        return cpf[-2:] == f"{primeiro_digito}{segundo_digito}"

       
    # Função para enviar o formulário
    def submit_form(self):
        conn = connect_db()
        if conn is None:
            messagebox.showerror("Erro", "Não foi possível conectar ao banco de dados.")
            return

        try:
            cursor = conn.cursor()

            # Pegando os valores dos campos
            nome = self.name_entry.get()
            cpf = self.cpf_entry.get()
            email = self.email_entry.get()
            telefone = self.telefone_entry.get()
            endereco = self.endereco_entry.get()
            cep = self.cep_entry.get()
            bairro = self.bairro_entry.get()
            observacao = self.observacoes_entry.get( 1.0, 'end-1c' )

        # Validação do CPF
            if not self.validate_cpf(cpf):
                messagebox.showerror("Erro", "CPF inválido.")
                return

        # Inserindo os dados no banco de dados
            query = """
                INSERT INTO clientes (nome, cpf, email, telefone, endereco, cep, bairro,observacao)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (nome, cpf, email, telefone, endereco, cep, bairro, observacao))
            conn.commit()

           

            messagebox.showinfo("Sucesso", "Cadastro realizado com sucesso!")

        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao cadastrar: {e}")
        finally:
            cursor.close()
            conn.close()
