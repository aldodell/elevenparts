//analizar las horizontales. Tomamos la pregunta "index+1"  de cada sección (de 10 preguntas) y averiguamos si es B o X
		ini = index - 1; // Los caracteres empiezan en la posicion cero, pero el indice se seccion en 1, asi que restamos
		ini = ini + 1; // buscamos el segundo caracter
		ini = ini + (10 * (i+1)); //Sumamos la decena de cada sección
		k = chain.substr(ini,1);
		if (k == "B") result++;
		
		//Analizamos las verticales. Localizamos la sección y sumanos todas las "A"
		ini = 1 + (i*2) + (20 * (index - 1));
		k = chain.substr(ini,1);
		if (k == "A") result++;
	}
	
	return result;