export default class UserInfo {
            constructor(config) {
                this._profileName = document.querySelector(config.nameSelector);
                this._profileText = document.querySelector(config.jobSelector);
                this._nameEditInput = document.querySelector(".form__item_type_name");
                this._jobEditInput = document.querySelector(".form__item_type_job");
            
            }
        
            getUserInfo() {
                return {
                    firstname:  this._nameEditInput.value = this._profileName.textContent,
                    description: this._jobEditInput.value = this._profileText.textContent
                }
            }
            serUserInfo(dataUser) {
                this._profileName.textContent = dataUser.firstname
                this._profileText.textContent = dataUser.description
             }
        
        }
// export default class UserInfo {
//     constructor(name, text) {
//         this._inputName = name
//         this._inputText = text
//         this._profileName = document.querySelector('.profile__title');
//         this._profileText = document.querySelector('.profile__subtitle');
//     }
   
//     getUserInfo() {
//         return {
//         name: this._inputName.value = this._profileName.textContent,
//         text: this._inputText.value = this._profileText.textContent
//         }
//     }
//     // serUserInfo(name, text) {
//     //     this._profileName.textContent = name
//     //     this._profileText.textContent = text
//     //  }
//     setUserInfo() {

//         this._inputName.textContent = this._profileName.value,
//         this._inputText.textContent = this._profileText.value

//     }
// }