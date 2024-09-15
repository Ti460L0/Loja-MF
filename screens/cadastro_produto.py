import customtkinter as ct
from tkinter import messagebox
from database.db_connection import connect_db

class CadastroProduto(ct.CTkFrame):
    def __init__(self, master=None):
        super().__init__(master)
        

        # HotKeys
        self.master.bind("<Escape>", lambda event: self.master.destroy())

        
        ### FRAMES ###

        # Main Frame
        self.main_frame = ct.CTkFrame(self.master, border_color="darkgoldenrod", border_width=5, corner_radius=10)
        self.main_frame.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)


        # Frame do Titulo
        self.title_frame = ct.CTkFrame(self.main_frame, height=50, corner_radius=10)
        self.title_frame.place(relx=0.5, rely=0.5, anchor="center")
        


        # Titulo Menu
        self.vestido_button = ct.CTkButton(self.title_frame, text="👗\nCadastrar vestido", font=("Arial", 20), height=150, width=200, command=lambda: self.change_frame('vestidos'))
        self.vestido_button.grid(row=0, column=0, padx=10, pady=10)

        self.acessorio_button = ct.CTkButton(self.title_frame, text="👑\nCadastrar acessorio", font=("Arial", 20), height=150, width=200, command=lambda: self.change_frame('acessorios'))
        self.acessorio_button.grid(row=0, column=1, padx=10, pady=10)

        self.voltar_button = ct.CTkButton(self.title_frame, text="↩️\nVoltar", font=("Arial", 20), fg_color="red", height=50, width=100, command=lambda: self.destroy())
        self.voltar_button.grid(row=1, column=0, padx=10, pady=10, columnspan=2, sticky="nsew")


    #### FORMULÁRIO VESTIDO ####

        # Frame das entradas Vestido
        self.entradas_frame_vestidos = ct.CTkFrame(self.main_frame, bg_color="transparent", fg_color="transparent")

        # Subtitulo Cadastrar vestido
        self.subtitle_label = ct.CTkLabel(self.entradas_frame_vestidos, text="Cadastrar vestido", font=("Arial", 20))
        self.subtitle_label.place(relx=0.5, rely=0.05, anchor="center")

        # Código do vestido
        self.codigoVestido_entry = ct.CTkEntry(self.entradas_frame_vestidos, width=80, placeholder_text="Código")
        self.codigoVestido_entry.place(relx=0.1, rely=0.2, anchor="w")

        # Modelo vestido
        self.modeloVestido_entry = ct.CTkEntry(self.entradas_frame_vestidos, width=300, placeholder_text="Modelo")
        self.modeloVestido_entry.place(relx=0.3, rely=0.2, anchor="w")

        # Tamanho vestido
        self.tamanhoVestido_entry = ct.CTkComboBox(self.entradas_frame_vestidos, values=["P", "M", "G", "GG", "U"], width=80, state="readonly")
        self.tamanhoVestido_entry.set("P")
        self.tamanhoVestido_entry.place(relx=0.1, rely=0.35, anchor="w")

        # Cor vestido
        self.corVestido_entry = ct.CTkEntry(self.entradas_frame_vestidos, width=80, placeholder_text="Cor")
        self.corVestido_entry.place(relx=0.1, rely=0.5, anchor="w")

        # Status vestido
        self.statusVestido_entry = ct.CTkComboBox(self.entradas_frame_vestidos, values=["Disponível", "Alugado", "Em manutenção"], width=200, state="readonly")
        self.statusVestido_entry.set("Disponível")
        self.statusVestido_entry.place(relx=0.3, rely=0.35, anchor="w")

        # Valor vestido
        self.valorVestido_entry = ct.CTkEntry(self.entradas_frame_vestidos, width=100, placeholder_text="Valor")
        self.valorVestido_entry.place(relx=0.3, rely=0.5, anchor="w")

        # Submit button
        self.submit_button = ct.CTkButton(self.entradas_frame_vestidos, text='Salvar', width=200, command=lambda: self.submit_vestido())
        self.submit_button.place(relx=0.3, rely=0.7, anchor="e")

        # Cancel button
        self.cancel_button = ct.CTkButton(self.entradas_frame_vestidos, text='Voltar', width=200, command=lambda: self.change_frame('title_menu'))
        self.cancel_button.place(relx=0.7, rely=0.7, anchor="w")





        ##### FORMULÁRIO ACESSÓRIO #####

        # Frame das entradas Acessorio
        self.entradas_frame_acessorios = ct.CTkFrame(self.main_frame)

        # Subtitulo Cadastrar acessório
        self.subtitle_label = ct.CTkLabel(self.entradas_frame_acessorios, text="Cadastrar acessório")
        self.subtitle_label.grid(row=0, column=0, columnspan=2, pady=10)

        # Tipo de acessório
        self.tipoAcessorio_label = ct.CTkLabel(self.entradas_frame_acessorios, text='Tipo:')
        self.tipoAcessorio_label.grid(row=0, column=0, pady=10)
        self.tipoAcessorio_entry = ct.CTkEntry(self.entradas_frame_acessorios, width=200)
        self.tipoAcessorio_entry.grid(row=0, column=1, pady=10)

        # Tamanho acessorio
        self.tamanhoAcessorio_label = ct.CTkLabel(self.entradas_frame_acessorios, text='Tamanho:')
        self.tamanhoAcessorio_label.grid(row=2, column=0, pady=10)
        self.tamanhoAcessorio_entry = ct.CTkEntry(self.entradas_frame_acessorios, width=200)
        self.tamanhoAcessorio_entry.grid(row=2, column=1, pady=10)

        # Cor acessorio
        self.corAcessorio_label = ct.CTkLabel(self.entradas_frame_acessorios, text='Cor:')
        self.corAcessorio_label.grid(row=3, column=0, pady=10)
        self.corAcessorio_entry = ct.CTkEntry(self.entradas_frame_acessorios, width=200)
        self.corAcessorio_entry.grid(row=3, column=1, pady=10)

        # Status acessorio
        self.statusAcessorio_label = ct.CTkLabel(self.entradas_frame_acessorios, text='Status:')
        self.statusAcessorio_label.grid(row=4, column=0, pady=10)
        self.statusAcessorio_entry = ct.CTkEntry(self.entradas_frame_acessorios, width=200)
        self.statusAcessorio_entry.grid(row=4, column=1, pady=10)

        # Submit
        self.submit_button = ct.CTkButton(self.entradas_frame_acessorios, text='Salvar', command=lambda: self.submit_acessorio())
        self.submit_button.grid(row=5, column=2, padx=10, pady=10)
        
        # Voltar
        self.cancel_button = ct.CTkButton(self.entradas_frame_acessorios, text='Voltar', command=lambda: self.change_frame('title_menu'))
        self.cancel_button.grid(row=5, column=3, padx=10, pady=10)

    def change_frame(self, frame):

        # Ocultar todos os frames antes de mostrar o novo
        self.entradas_frame_vestidos.place_forget()
        self.entradas_frame_acessorios.place_forget()
        self.title_frame.place_forget()

        # Exibir o frame correspondente
        if frame == 'title_menu':
            self.title_frame.place(relx=0.5, rely=0.5, anchor="center")   
        elif frame == 'acessorios':
            self.entradas_frame_acessorios.place(relx=0.5, rely=0.5, anchor="center")
        elif frame == 'vestidos':
            self.entradas_frame_vestidos.place(relx=0.5, rely=0.5, anchor="center", relwidth=0.8, relheight=0.8)
            
        else:
            raise ValueError("Invalid frame name")

        
        
        ### ENVIAR FORMULÁRIO VESTIDO ###

    def submit_vestido(self):
        
        conn = connect_db()
        if conn is None:
            messagebox.showerror("Erro", "Não foi possível conectar ao banco de dados.")
            return
        try:
            cursor = conn.cursor()
            
            modeloVestido = self.modeloVestido_entry.get()
            tamanhoVestido = self.tamanhoVestido_entry.get()
            corVestido = self.corVestido_entry.get()
            statusVestido = self.statusVestido_entry.get()
            valorVestido = self.valorVestido_entry.get()
            codigoVestido = self.codigoVestido_entry.get()

            # Inserir os valores no banco de dados
            query = """
                INSERT INTO vestidos (modelo_vestido, tamanho_vestido, cor_vestido, status_vestido, valor_vestido, codigo_vestido) 
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (modeloVestido, tamanhoVestido, corVestido, statusVestido, valorVestido, codigoVestido))
            conn.commit()
            messagebox.showinfo("Sucesso", "Vestido inserido com sucesso!")

        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao inserir vestido: {e}")
            conn.rollback()

        finally:
            cursor.close()
            conn.close()


    ### ENVIAR FORMULÁRIO ACESSÓRIO ###

    def submit_acessorio(self):

        conn = connect_db()
        if conn is None:
            messagebox.showerror("Erro", "Não foi possível conectar ao banco de dados.")
            return
        try:
            cursor = conn.cursor()

            # Receber os valores do formulário
            tipoAcessorio = self.tipoAcessorio_entry.get()
            tamanhoAcessorio = self.tamanhoAcessorio_entry.get()
            corAcessorio = self.corAcessorio_entry.get()
            statusAcessorio = self.statusAcessorio_entry.get()

            # Inserir os valores no banco de dados
            query = """
                INSERT INTO acessorios (tipo_acessorio, tamanho_acessorio, cor_acessorio, status_acessorio) 
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query, (tipoAcessorio, tamanhoAcessorio, corAcessorio, statusAcessorio))
            conn.commit()
            messagebox.showinfo("Sucesso", "Acessório inserido com sucesso!")

        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao inserir acessório: {e}")
            conn.rollback()

        finally:
            cursor.close()
            conn.close()
