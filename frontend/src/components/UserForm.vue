<template>
	<div>
		<b-form @submit.prevent="userForm()">
			<b-form-row>
				<div class="col">
					<b-form-group id="input-group-prenom" :label="prenomLabel" label-for="signup-prenom">
						<b-form-input id="signup-prenom" v-model="form.prenom" type="text" maxlength="128" :placeholder="prenomPlaceholder" :required="prenomRequired"></b-form-input>
					</b-form-group>
				</div>
				<div class="col">
					<b-form-group id="input-group-nom" :label="nomLabel" label-for="signup-nom">
						<b-form-input id="signup-nom" v-model="form.nom" maxlength="128" :placeholder="nomPlaceholder" :required="nomRequired"></b-form-input>
					</b-form-group>
				</div>
			</b-form-row>
			<b-form-group id="input-group-email" :label="emailLabel" label-for="signup-email">
				<b-form-input id="signup-email" v-model="form.email" type="text" :placeholder="emailPlaceholder" :required="emailRequired"></b-form-input>
			</b-form-group>
			<b-form-row>
				<div class="col">
					<b-form-group id="input-group-password" :label="passwordLabel" label-for="signup-password">
						<b-form-input id="signup-password" v-model="form.password" type="password" :placeholder="passwordPlaceholder" :required="passwordRequired"></b-form-input>
					</b-form-group>
				</div>

				<div class="col">
					<b-form-group id="input-group-password-check" :label="passwordcheckLabel" label-for="signup-password-check">
						<b-form-input id="signup-password-check" v-model="form.passwordCheck" type="password" :placeholder="passwordcheckPlaceholder" :required="passwordcheckRequired"></b-form-input>
					</b-form-group>
				</div>
				<small tabindex="-1" class="form-text text-user-form">Il doit contenir au moins 8 caractères dont au moins une minuscule, une majuscule, un chiffre et un caractère spécial.</small>
			</b-form-row>

			<b-form-group id="input-group-avatar" :label="avatarLabel" label-for="signup-avatar" class="mt-3">
				<b-form-file
					:placeholder="avatarPlaceholder"
					:drop-placeholder="avatarDropPlaceholder"
					accept="image/jpeg, image/png, image/gif"
					browse-text="Choisir"
					class="text-left"
					@change="onFileUpload"
				></b-form-file>
			</b-form-group>

			<b-form-group id="input-group-admin" :label="adminLabel" label-for="signup-admin">
				<b-form-input id="signup-admin" v-model="form.admin" type="text" :placeholder="adminPlaceholder"></b-form-input>
				<small tabindex="-1" class="form-text text-user-form">Si vous etes administrateur, veuillez entrez votre code admin</small>
			</b-form-group>

			<b-alert show variant="danger" v-if="message != ''">{{ message }}</b-alert>

			<b-button type="submit" variant="primary" class="mb-3">{{ submitButton }}</b-button>
		</b-form>
	</div>
</template>

<script>
import axios from "axios";
import onFileUpload from "@/mixins/onFileUpload";

export default {
	name: "UserForm",
	mixins: [onFileUpload],
	props: {
		prenomLabel: {
			type: String,
		},
		prenomPlaceholder: {
			type: String,
		},
		prenomRequired: {
			type: Boolean,
		},
		nomLabel: {
			type: String,
		},
		nomPlaceholder: {
			type: String,
		},
		nomRequired: {
			type: Boolean,
		},
		emailLabel: {
			type: String,
		},
		emailPlaceholder: {
			type: String,
		},
		emailRequired: {
			type: Boolean,
		},
		passwordLabel: {
			type: String,
		},
		passwordPlaceholder: {
			type: String,
		},
		passwordRequired: {
			type: Boolean,
		},
		passwordcheckLabel: {
			type: String,
		},
		passwordcheckPlaceholder: {
			type: String,
		},
		passwordcheckRequired: {
			type: Boolean,
		},
		avatarLabel: {
			type: String,
		},
		avatarPlaceholder: {
			type: String,
		},
		avatarDropPlaceholder: {
			type: String,
		},
		adminLabel: {
			type: String,
		},
		adminPlaceholder: {
			type: String,
		},
		submitButton: {
			type: String,
		},
	},

	data() {
		return {
			message: "",
			modify: false,
			form: {
				prenom: "",
				nom: "",
				email: "",
				password: "",
				passwordCheck: "",
				admin: "",
			},
		};
	},

	methods: {
		userForm() {
			let profilePage = false;
			if (this.$route.name == "Profil") {
				profilePage = true;
			}
			// if on profile page create userId variable
			if (profilePage) {
				var userId = this.$user.userId;
			}
			let prenom = this.form.prenom;
			let nom = this.form.nom;
			let email = this.form.email;
			let password = this.form.password;
			const passwordCheck = this.form.passwordCheck;
			let admin = this.form.admin;
			const nameRegex = /^([A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ ,.'-]*){1,128}$/;
			let checkPrenom = false;
			let checkNom = false;
			let checkAdmin = false;
			let checkEmail = false;
			const formData = new FormData();
			// if prenom is empty AND user on profile page prenom will not change
			if ((prenom === undefined || prenom.length === 0) && profilePage) {
				prenom = this.$user.prenom;
				checkPrenom = true;
			} else if (!nameRegex.test(prenom)) {
				this.message = "Votre prénom semble invalide";
			} else if (nameRegex.test(prenom)) {
				// else add prenom in submit
				formData.append("prenom", prenom);
				checkPrenom = true;
			}
			// if nom is empty AND user on profile page nom will not change
			if ((nom === undefined || nom.length === 0) && profilePage) {
				nom = this.$user.nom;
				checkNom = true;
			} else if (!nameRegex.test(nom)) {
				this.message = "Votre nom semble invalide";
			} else {
				// else add nom in submit
				formData.append("nom", nom);
				checkNom = true;
			}
			// if email is empty AND user on profile page nom will not change and email is checked
			if ((email === undefined || email.length === 0) && profilePage) {
				email = this.$user.email;
				checkEmail = true;
			} else if (profilePage) {
				// if user on profil page AND email is the same, email is not checked and a error message is sended
				if (email == this.$user.email) {
					this.message = "Email déjà utilisé";
				} else {
					// if user on profile page AND email is not the same, email is checked and add in submit
					formData.append("email", email);
					checkEmail = true;
				}
			} else {
				// if user is not on profile page AND email is not the same, email is checked and add in submit
				formData.append("email", email);
				checkEmail = true;
			}
			// if password is not empty, password is add in submit
			if (password != undefined || password.length != 0) {
				formData.append("password", password);
			}
			// if FILE is not null, FILE is add in submit
			if (this.FILE != null) {
				formData.append("image", this.FILE, this.FILE.name);
			}
			// if 'admin' is enter, admin is add in submit, admin is checked and user will get admin privilege
			if (admin === "admin") {
				formData.append("admin", 1);
				admin = 1;
				checkAdmin = true;
				// if '0' is enter or admin is empty, admin is add in submit, admin is checked and user will not get admin privilege
			} else if (admin === "0" || admin === undefined || admin.length === 0) {
				formData.append("admin", 0);
				admin = 0;
				checkAdmin = true;
				// if user on profile page and admin is empty, admin is add in submit, admin is checked and user admin privilege will not change
			} else if ((admin === undefined || admin.length === 0) && profilePage) {
				formData.append("admin", this.$user.admin);
				admin = this.$user.admin;
				checkAdmin = true;
			} else {
				// if admin code is not valid, admin is not checked and a error message is sended
				this.message = "Le code admin saisi est invalide";
			}
			// if password, admin and email are checked the form is sended
			if (password === passwordCheck && checkAdmin === true && checkEmail === true && checkPrenom === true && checkNom === true) {
				// if user on profile page the form is sended for modify user
				if (profilePage) {
					axios
						.put(`http://localhost:3000/api/auth/modify_user/${userId}`, formData, {
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${this.$token}`,
							},
						})
						.then(() => {
							let user = JSON.parse(localStorage.getItem("user"));
							const token = user.token;
							localStorage.setItem("user", JSON.stringify({ userId: userId, nom: nom, prenom: prenom, admin: admin, token: token, email: email }));
							location.reload();
						})
						.catch((error) => {
							if (error.response.status === 401) {
								this.message = error.response.data.message;
							}
						});
				} else if (this.$route.name == "Signup") {
					// if user on signup page the form is sended for create user
					axios
						.post(`http://localhost:3000/api/auth/signup`, formData, {
							headers: {
								"Content-Type": "application/json",
							},
						})
						.then((res) => {
							if (res.status === 201) {
								location.href = "/";
							}
						})
						.catch((error) => {
							if (error.response.status === 401) {
								this.message = error.response.data.message;
							}
						});
				}
			} else if (password != passwordCheck) {
				// if password is not checked, the form is not sended and a error message is sended
				this.message = "Les mots de passe saisis ne correspondent pas";
			}
		},
	},
};
</script>
