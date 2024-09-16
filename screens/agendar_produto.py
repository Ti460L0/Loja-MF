import customtkinter as ct

class Agendar(ct.CTkFrame):
    def __init__(self, master):
        super().__init__(master)
        self.master = master
        self.configure(border_color="darkgoldenrod", border_width=5, corner_radius=10)

        # Main Frame
        self.main_frame = ct.CTkFrame(self, bg_color="red", fg_color="darkgoldenrod")
        self.main_frame.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)

        # Frame do Titulo
        self.title_frame = ct.CTkFrame(self.main_frame, height=50, corner_radius=10)
        self.title_frame.place(relx=0.5, rely=0.5, anchor="center")

        