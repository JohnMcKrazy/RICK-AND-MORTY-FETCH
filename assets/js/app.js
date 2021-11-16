document.addEventListener('DOMContentLoaded', () => {
    //! CONSTANTS
    const fragment = document.createDocumentFragment();
    const cardsList = document.getElementById('cards_list');
    const inputName = document.getElementById('name_input');
    const btnSerchName = document.getElementById('btn_serch_name');
    const btnCleanSerch = document.getElementById('clean_serch');
    const btnUp = document.querySelector('.btn_up');
    const templateCard = document.getElementById('template_card').content;
    console.log(templateCard);
    //? **************************************************************//

    //! VARIABLES
    let apiRickLink = 'https://rickandmortyapi.com/api/character';
    let nameSerched = '';

    //? **************************************************************//
    //!REUSABLE FUNCTIONS

    //? **************************************************************//
    //!FETCH FUNCTIONS
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

    //? **************************************************************//
    //!FUNCTIONS
    const inputNameValue = () => {
        nameSerched = inputName.value;
        fetchByName(nameSerched);
    };
    const createDataCard = (data) => {
        cleanSerch();
        setTimeout(() => {
            toTheTop();
        }, 500);
        let nameResults = data.results;
        console.log(nameResults);
        nameResults.forEach((name) => {
            //!CREATE

            console.log(name.name);
            let cloneTemplate = templateCard.cloneNode(true);
            let templateContent = cloneTemplate;

            let characterImg = templateContent.querySelector('.character_img');
            let characterName = templateContent.querySelector('.character_name');
            let characterOrigin = templateContent.querySelector('.character_origin');
            let characterLocation = templateContent.querySelector('.character_location');
            let characterGender = templateContent.querySelector('.character_gender');
            let characterSpecie = templateContent.querySelector('.character_specie');
            let characterStatus = templateContent.querySelector('.character_status');
            let characterEpisodes = templateContent.querySelector('.character_episodes');
            let characterId = templateContent.querySelector('.character_id');
            characterImg.setAttribute('src', name.image);
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
            console.log(name.id);
            fragment.appendChild(cloneTemplate);
        });
        cardsList.appendChild(fragment);
    };
    const cleanSerch = () => {
        const cards = document.querySelectorAll('.card').forEach((card) => {
            card;
            if (cardsList.childElementCount == 0) {
                console.log('No necesitas borrar');
            } else if (cardsList.childElementCount > 0) {
                console.log(card);
                cardsList.removeChild(card);
                console.log(cardsList);
                console.log('Necesitas borrar');
            }
        });
    };
    const toTheTop = () => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 200);
    };
    //? **************************************************************//
    //! ADDEVENTLISTENERS

    btnSerchName.addEventListener('click', inputNameValue);
    btnCleanSerch.addEventListener('click', cleanSerch);
    btnUp.addEventListener('click', toTheTop);
});
