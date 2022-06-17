const validarCharacter = [
    {
        "payload": {
            "alias": "Professor Xavier",
            "team": ["x-men", "Iluminates"],
            "active": true
        },
        "expected_message": '"name" is required'
    },
    {
        "payload": {
            "name": "Charles Francis Xavier",
            "team": ["x-men", "Iluminates"],
            "active": true
        },
        "expected_message": '"alias" is required'
    },
    {
        "payload": {
            "name": "Charles Francis Xavier",
            "alias": "Professor Xavier",
            "active": true
        },
        "expected_message": '"team" is required'
    },
    {
        "payload": {
            "name": "Charles Francis Xavier",
            "alias": "Professor Xavier",
            "team": ["x-men", "Iluminates"]
        },
        "expected_message": '"active" is required'
    }

]

export default validarCharacter;
