package org.example.entities;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
public class Contato implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CON_ID")
    private Long conId;
    @NotBlank(message = "Celular é obrigatório")
    @Size(max = 14, message = "Celular deve ter no máximo 14 caracteres")
    @Column(name = "CON_CELULAR", nullable = false, length = 14)
    private String conCelular;

    @NotBlank(message = "Telefone Comercial é obrigatório")
    @Size(max = 14, message = "Telefone Comercial deve ter no máximo 14 caracteres")
    @Column(name = "CON_TELEFONE_COMERCIAL", nullable = false, length = 14)
    private String conTelefoneComercial;

    @NotBlank(message = "Email é obrigatório")
    @Size(max = 55, message = "Email deve ter no máximo 55 caracteres")
    @Column( name = "CON_EMAIL", nullable = false, length = 55)
    private String conEmail;

    public Contato() {
    }

    public Contato(Long conId, String conCelular, String conTelefoneComercial, String conEmail) {
        this.conId = conId;
        this.conCelular = conCelular;
        this.conTelefoneComercial = conTelefoneComercial;
        this.conEmail = conEmail;
    }

    public Long getConId() {
        return conId;
    }

    public void setConId(Long conId) {
        this.conId = conId;
    }

    public String getConCelular() {
        return conCelular;
    }

    public void setConCelular(String conCelular) {
        this.conCelular = conCelular;
    }

    public String getConTelefoneComercial() {
        return conTelefoneComercial;
    }

    public void setConTelefoneComercial(String conTelefoneComercial) {
        this.conTelefoneComercial = conTelefoneComercial;
    }

    public String getConEmail() {
        return conEmail;
    }

    public void setConEmail(String conEmail) {
        this.conEmail = conEmail;
    }
}
