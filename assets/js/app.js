document.addEventListener('DOMContentLoaded', () => {
    //! CONSTANTS
    const fragment = document.createDocumentFragment();
    const header = document.querySelector('.header');
    const cardsList = document.querySelector('#cards_list');
    const inputName = document.querySelector('#name_input');
    const btnsearchName = document.querySelector('#btn_search_name');
    const btnCleanInput = document.querySelector('#btn_clean_input');
    const btntrashsearch = document.querySelector('#trash_search');
    const btnUp = document.querySelector('.btn_up');
    const templateCard = document.querySelector('#template_card').content;
    //? **************************************************************//

    //! VARIABLES
    let apiRickLink = 'https://rickandmortyapi.com/api/character';
    let namesearched = '';
    let sumOfClicks = 0;
    //! *********************************************************/

    //!REUSABLE FUNCTIONS

    //! *********************************************************/

    //!FETCH FUNCTIONS
    //?SERCH BY NAME FETCH
    const fetchByName = async (name) => {
        try {
            const res = await fetch(apiRickLink + `/?name=${name}`);
            const data = await res.json();
            console.log(data);
            createDataCard(data);
        } catch (error) {
            console.log('error al capturar la informacion');
        } finally {
        }
    };

    //! *********************************************************/

    //!FUNCTIONS
    //? SCRAP INPUT VALUE FOR CHECK NAME
    const inputNameValue = () => {
        namesearched = inputName.value;
        fetchByName(namesearched);
    };
    //! *********************************************************/

    //!CLEAR INPUT DATA
    const cleanInput = () => {
        namesearched = '';
        inputName.value = namesearched;
    };

    //! *********************************************************/
    //?CREATE DATA FOR CARDS FUNCTION
    const createDataCard = (data) => {
        //!trash DATA FUNCTION
        trashsearch();
        //!SET TOP 0 FUNCTION
        setTimeout(() => {
            toTheTop();
        }, 500);
        //!START searchING
        let nameResults = data.results;
        console.log(nameResults);
        nameResults.forEach((name) => {
            //!CREATE
            //*console.log(name.name);
            //!CLONE TEMPLATE TO CREATE CARDS
            let cloneTemplate = templateCard.cloneNode(true);
            let templateContent = cloneTemplate;
            //! *********************************************************/

            //!QUERY SELECTORS FROM TEMPLATE CLONES -- SET AFTER CREATE CLONE
            let characterCard = templateContent.querySelector('#card');
            let characterImg = templateContent.querySelector('.character_img_container');
            let characterBasicInfo = templateContent.querySelector('.character_basic_info_container');
            let btnInfo = templateContent.querySelector('.btn_info');
            let btnInfoText = templateContent.querySelector('.btn_info_text');
            let characterName = templateContent.querySelector('.character_name');
            let characterOrigin = templateContent.querySelector('.character_origin');
            let characterLocation = templateContent.querySelector('.character_location');
            let characterGender = templateContent.querySelector('.character_gender');
            let characterSpecie = templateContent.querySelector('.character_specie');
            let characterStatus = templateContent.querySelector('.character_status');
            let characterEpisodes = templateContent.querySelector('.character_episodes');
            let characterId = templateContent.querySelector('.character_id');
            //! *********************************************************/

            //!SET INFO FETCH API TO CLONE TEMPLATE
            characterImg.style.background = ` linear-gradient(var(--blackOff), transparent),url(\"${name.image}\") center center`;
            btnInfoText.textContent = 'Show more';
            characterName.textContent = name.name;
            //*console.log(characterName);
            characterOrigin.textContent = name.origin.name;
            //*console.log(characterOrigin);
            characterEpisodes.textContent = name.episode.length;
            //*console.log(characterEpisodes);
            characterLocation.textContent = name.location.name;
            //*console.log(name.location.name);
            characterGender.textContent = name.gender;
            //*console.log(name.gender);
            characterStatus.textContent = name.status;
            //*console.log(name.status);
            characterSpecie.textContent = name.species;
            //*console.log(name.species);
            characterId.textContent = name.id;
            //*console.log(name.id);
            //! *********************************************************/

            //!FUNCTION FOR CLICK IN SHOW MORE BTN
            const showInfoCharacter = () => {
                sumOfClicks += 3;
                console.log(sumOfClicks);
                if (btnInfoText.textContent == 'Show more') {
                    characterCard.classList.add('card_show_info');
                    btnInfoText.textContent = 'Show less';
                } else if ((btnInfoText.textContent = 'Show less')) {
                    characterCard.classList.remove('card_show_info');
                    btnInfoText.textContent = 'Show more';
                }
            };
            //!EVENTLISTENERS INNER FUNCTION FROM CARD HOVER
            characterCard.addEventListener('mouseenter', () => {
                characterImg.style.background = `url(\"${name.image}\") center center`;
                characterBasicInfo.style.opacity = '0';
            });
            characterCard.addEventListener('mouseleave', () => {
                characterImg.style.background = ` linear-gradient(var(--blackOff), transparent),url(\"${name.image}\") center center`;
                characterBasicInfo.style.opacity = '1';
            });
            btnInfo.addEventListener('click', showInfoCharacter);
            fragment.appendChild(cloneTemplate);
        });
        //! *********************************************************/

        //!SET PROPERTIES FROM CLONE TEMPLATE TO CARD LIST
        cardsList.appendChild(fragment);
    };
    //! *********************************************************/

    //?trash SERCH FUNCTION
    const trashsearch = () => {
        const cards = document.querySelectorAll('.card').forEach((card) => {
            if (cardsList.childElementCount > 0) {
                console.log(card);
                cardsList.removeChild(card);
                console.log(cardsList);
                console.log('Cards borradas');
            }
        });
    };
    //! *********************************************************/

    //?TO THE TOP FUNCTION
    const toTheTop = () => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 200);
    };
    //! *****************************************************************/

    //! ADDEVENTLISTENERS
    btnsearchName.addEventListener('click', inputNameValue);
    btnCleanInput.addEventListener('click', cleanInput);
    btntrashsearch.addEventListener('click', trashsearch);
    btnUp.addEventListener('click', toTheTop);
});
