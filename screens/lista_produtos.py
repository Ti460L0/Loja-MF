import customtkinter as ct
from tkinter import messagebox
from database.db_connection import connect_db
from screens.object_details import ObjectDetails




class ListaProdutos(ct.CTkFrame):
    def __init__(self, master, fields_instance):
        super().__init__(master)

        self.fields_instance = fields_instance


        self.master = master
        self.configure(border_color="darkgoldenrod")

        # Frame Principal
        self.main_frame = ct.CTkFrame(self)
        self.main_frame.pack(side="top", fill="both", expand=True)

        # Frame do Titulo
        self.title_frame = ct.CTkFrame(self.main_frame)
        self.title_frame.pack(side="top", fill="x", padx=20, expand=True)

        # Frame da Tabela
        self.lista_frame = ct.CTkScrollableFrame(self.main_frame)
        self.lista_frame.pack(side="top", fill="x", expand=True, padx=20, pady=20)



        # Frame do Titulo (agrupado dentro de title_frame)

        self.titulo_label = ct.CTkLabel(self.title_frame, text="Lista geral de: ", font=("Arial", 15))
        self.titulo_label.grid(row=0, column=0, padx=10, pady=10)

        self.change_button = ct.CTkSegmentedButton(self.title_frame, values=["Vestidos", "Acessórios", "Clientes"], command=self.change_option)
        self.change_button.set("Vestidos")
        self.change_button.grid(row=0, column=1, padx=10, pady=10)

        self.data_type = "vestidos"  # Tipo padr o ao iniciar o programa
        self.load_data()

        

    def change_option(self, fields):

        if fields == "Vestidos":
            self.data_type = "vestidos"
        elif fields == "Acessórios":
            self.data_type = "acessorios"
        elif fields == "Clientes":
            self.data_type = "clientes"

        self.load_data()
        self.fields_instance.set_labels(self.headers_list)
        

        

    def on_item_click(self, item_data):
        self.fields_instance.set_fields(item_data)

    def load_data(self):

        conn = connect_db()
        if conn is None:
            messagebox.showerror("Erro", "Não foi possível conectar ao banco de dados.")
            return

        # Limpa a lista de produtos antes de carregar novos dados
        for widget in self.lista_frame.winfo_children():
            widget.destroy()

        try:
            cursor = conn.cursor()

            if self.data_type == "vestidos":
                cursor.execute("SELECT codigo_vestido, modelo_vestido, tamanho_vestido, cor_vestido, status_vestido, valor_vestido FROM vestidos")
                items = cursor.fetchall()
                self.headers_list = ["Código", "Modelo/Tipo", "Tamanho", "Cor", "Status", "Valor"]
            elif self.data_type == "acessorios":
                cursor.execute("SELECT tipo_acessorio, tamanho_acessorio, cor_acessorio, status_acessorio FROM acessorios")
                items = cursor.fetchall()
                self.headers_list = ['Código', 'Tipo', 'Tamanho', 'Cor', 'Status']
            elif self.data_type == "clientes":
                cursor.execute("SELECT nome, cpf, email, telefone, endereco, cep, bairro FROM clientes")
                items = cursor.fetchall()
                self.headers_list = ['Nome', 'CPF', 'Email', 'Telefone', 'Endereço', 'CEP', 'Bairro']

            
            label_select = ct.CTkLabel(self.lista_frame, text="Selecionar", font=("Arial", 14, "bold"))
            label_select.grid(row=0, column=0, sticky="nsew", padx=10, pady=10)
            label_acoes = ct.CTkLabel(self.lista_frame, text="Ações", font=("Arial", 14, "bold"))
            label_acoes.grid(row=0, column=len(self.headers_list)+1, sticky="nsew", columnspan=2, padx=10, pady=10)

            for col, header in enumerate(self.headers_list, start=1):
                label = ct.CTkLabel(self.lista_frame, text=header, font=("Arial", 14, "bold"))
                label.grid(row=0, column=col, sticky="nsew", padx=10, pady=10)

            # Exibir os produtos na tabela
            for row, item in enumerate(items, start=1):
                for col, value in enumerate(item):
                    label = ct.CTkLabel(self.lista_frame, text=str(value) if value is not None else "", font=("Arial", 12))
                    label.grid(row=row, column=col+1, sticky="nsew", padx=10, pady=5)

                    select_button = ct.CTkCheckBox(self.lista_frame, text="", font=("Arial", 12), command=lambda i=item: self.on_item_click(i))
                    select_button.grid(row=row, column=0, sticky="nsew", padx=10, pady=5)

                    edit_button = ct.CTkButton(self.lista_frame, text="Editar", font=("Arial", 12), width=40, command=lambda i=item: self.on_item_click(i))
                    edit_button.grid(row=row, column=len(self.headers_list)+2)

                    delete_button = ct.CTkButton(self.lista_frame, text="Excluir", font=("Arial", 12), width=40, command=lambda i=item: self.on_item_click(i))
                    delete_button.grid(row=row, column=len(self.headers_list)+1)

                # Adicionar evento de clique (botão "Selecionar")

        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao carregar dados: {e}")

        finally:
            cursor.close()
            conn.close()
