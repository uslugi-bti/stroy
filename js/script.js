document.addEventListener("DOMContentLoaded", function () {
    function testWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    testWebP(function (support) {
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });

    const body = document.querySelector("body");
    const header = document.querySelector(".header");
    const headerBottomBody = document.querySelector(".header-bottom__body");
    const headerTopContainer = document.querySelector(".header-top>.container");
    const headerBottomList = document.querySelector(".header-bottom__list");
    const headerBottomLink = document.querySelector(".header-bottom__link");
    const headerTop = document.querySelector(".header-top");
    const headerMenu = document.querySelector(".header-bottom__menu");
    const headerLinks = document.querySelectorAll(".header-bottom__item a");

    function moveHeader() {
        const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        if (viewport_width < 970) {
            headerTopContainer.insertBefore(headerBottomList, headerTopContainer.children[0])
            headerTopContainer.insertBefore(headerBottomLink, headerTopContainer.children[1]);
        } else {
            headerBottomBody.insertBefore(headerBottomList, headerBottomBody.children[1]);
            headerBottomBody.insertBefore(headerBottomLink, headerBottomBody.children[2]);
        }
    }
    moveHeader();
    window.addEventListener("resize", moveHeader);

    headerMenu.addEventListener("click", function () {
        body.classList.toggle("header-lock");
        header.classList.toggle("active");
        headerTop.classList.toggle("active");
        headerMenu.classList.toggle("active");
    });

    for (let i = 0; i < headerLinks.length; i++) {
        headerLinks[i].addEventListener("click", function () {
            body.classList.remove("header-lock");
            header.classList.remove("active");
            headerTop.classList.remove("active");
            headerMenu.classList.remove("active");
        });
    }

    if (document.querySelector(".services")) {
        const servicesButton = document.querySelector(".services__button>button");
        const servicesItems = document.querySelectorAll(".services__item");
        const servicesButtonShow = servicesButton.textContent;
        let servicesButtonHide = servicesButton.id;
        if (servicesButtonHide == "Close") {
            servicesButtonHide = "Спрятать";
        }

        function hideItems() {
            for (let i = 6; i < servicesItems.length; i++) {
                servicesItems[i].style.display = "none";
            }
        }
        function showItems() {
            for (let i = 0; i < servicesItems.length; i++) {
                servicesItems[i].style.display = "block";
            }
        }
        hideItems();

        servicesButton.addEventListener("click", function () {
            if (servicesButton.classList.contains("active")) {
                servicesButton.classList.remove("active");
                servicesButton.innerHTML = servicesButtonShow;
                hideItems();
            } else {
                servicesButton.classList.add("active");
                servicesButton.innerHTML = servicesButtonHide;
                showItems();
            }
        });
    }

    if (document.querySelector(".nums")) {
        const blockTitles = document.querySelectorAll(".nums-item__title span");
        const blockColumns = document.querySelectorAll(".nums__item");
        const arrTexts = [];
        const animationDone = [];

        for (let i = 0; i < blockTitles.length; i++) {
            var blockTitlesText = Number(blockTitles[i].id);
            arrTexts.push(blockTitlesText);
            animationDone.push(false);
        }

        var animateCounter = function (element, endValue) {
            let startValue = 0;
            let duration = 1500;
            let startTime;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = (timestamp - startTime) / duration;

                if (progress < 1) {
                    const value = Math.floor(startValue + (endValue - startValue) * progress);
                    element.textContent = value;
                    requestAnimationFrame(step);
                } else {
                    element.textContent = endValue;
                }
            }

            requestAnimationFrame(step);
        };

        var increment = function () {
            for (let i = 0; i < blockColumns.length; i++) {
                var blockColumnTop = blockColumns[i].getBoundingClientRect().top;
                var koef = 2;

                if (blockColumnTop < window.innerHeight - (blockColumns[i].clientHeight / koef) && blockColumnTop > 0 && !animationDone[i]) {
                    blockTitles[i].classList.add("active");
                    animateCounter(blockTitles[i], arrTexts[i]);
                    animationDone[i] = true;
                }
            }
        }

        window.addEventListener("load", increment);
        window.addEventListener("scroll", increment);
    }

    if (document.querySelector(".projects")) {
        const projectsFiltersItems = document.querySelectorAll(".projects-filters__item");
        const projectsItem = document.querySelectorAll(".projects__item");

        function removeFilterClasses() {
            for (let i = 0; i < projectsFiltersItems.length; i++) {
                projectsFiltersItems[i].classList.remove("active");
            }
            for (let i = 0; i < projectsItem.length; i++) {
                projectsItem[i].style.display = "none";
            }
        }

        for (let i = 0; i < projectsFiltersItems.length; i++) {
            projectsFiltersItems[i].addEventListener("click", function () {
                removeFilterClasses();
                if (projectsFiltersItems[i].id == "all") {
                    projectsFiltersItems[i].classList.add("active");
                    for (let j = 0; j < projectsItem.length; j++) {
                        projectsItem[j].style.display = "block";
                    }
                } else {
                    projectsFiltersItems[i].classList.add("active");
                    for (let j = 0; j < projectsItem.length; j++) {
                        if (projectsFiltersItems[i].id == projectsItem[j].id) {
                            projectsItem[j].style.display = "block";
                        }
                    }
                }
            });
        }
    }

    if (document.querySelector(".service")) {
        const servicePopup = document.querySelector(".service-popup");
        const prevImage = document.querySelector(".service-popup__buttons span#prev");
        const nextImage = document.querySelector(".service-popup__buttons span#next");
        const serviceImagesImg = document.querySelectorAll(".service__gallery img");
        const serviceImagesSource = document.querySelectorAll(".service__gallery source");
        const serviceImageImg = document.querySelector(".service-popup__img img");
        const serviceImageSource = document.querySelector(".service-popup__img source");
        serviceImageImg.src = "";
        serviceImageSource.srcset = "";

        function removeImageClasses() {
            for (let i = 0; i < serviceImagesImg.length; i++) {
                serviceImagesImg[i].classList.remove("active");
            }
        }
        
        for (let i = 0; i < serviceImagesImg.length; i++) {
            serviceImagesImg[i].addEventListener("click", function () {
                body.classList.add("lock");
                servicePopup.classList.add("open");
                serviceImageImg.src = serviceImagesImg[i].src;
                serviceImageSource.srcset = serviceImagesSource[i].srcset;
                removeImageClasses();
                serviceImagesImg[i].classList.add("active");
            });
        }

        servicePopup.addEventListener("click", function (event) {
            if (!event.target.closest(".service-popup__img img")) {
                body.classList.remove("lock");
                servicePopup.classList.remove("open");
                removeImageClasses();
            }
        });

        let currentIndex = 0;

        for (let i = 0; i < serviceImagesImg.length; i++) {
            serviceImagesImg[i].addEventListener("click", function () {
                currentIndex = i;
            });
        }

        function updatePopupImage(index) {
            serviceImageImg.src = serviceImagesImg[index].src;
            serviceImageSource.srcset = serviceImagesSource[index]?.srcset || "";
            removeImageClasses();
            serviceImagesImg[index].classList.add("active");
        }

        nextImage.addEventListener("click", function (e) {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % serviceImagesImg.length;
            updatePopupImage(currentIndex);
        });

        prevImage.addEventListener("click", function (e) {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + serviceImagesImg.length) % serviceImagesImg.length;
            updatePopupImage(currentIndex);
        });
    }

    const mainLink = document.querySelectorAll("a#main-button");
    const servicesLink = document.querySelectorAll("a#services-button");
    const proejctsLink = document.querySelectorAll("a#projects-button");
    const feedbacksLink = document.querySelectorAll("a#feedbacks-button");
    const contactsLink = document.querySelectorAll("a#contacts-button");

    for (let i = 0; i < mainLink.length; i++) {
        mainLink[i].addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = this.getAttribute('href');
        });
    }
    for (let i = 0; i < servicesLink.length; i++) {
        servicesLink[i].addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = this.getAttribute('href');
        });
    }
    for (let i = 0; i < proejctsLink.length; i++) {
        proejctsLink[i].addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = this.getAttribute('href');
        });
    }
    for (let i = 0; i < feedbacksLink.length; i++) {
        feedbacksLink[i].addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = this.getAttribute('href');
        });
    }
    for (let i = 0; i < contactsLink.length; i++) {
        contactsLink[i].addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = this.getAttribute('href');
        });
    }
});