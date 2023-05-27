export default class UserInfo {
        constructor(config) {
                this._profileName = document.querySelector(config.nameSelector);
                this._profileText = document.querySelector(config.jobSelector);
                this._profileAvatar = document.querySelector(config.avatarSelector);
            
            }
        
        getUserInfo() {
            return {
                firstname:  this._profileName.textContent,
                description: this._profileText.textContent
                }
            }


        serUserInfo({avatar, firstname, description}) {
                this._profileAvatar.src = avatar
                this._profileName.textContent = firstname
                this._profileText.textContent = description
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