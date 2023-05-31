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
