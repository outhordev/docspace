---
title: Architecture
order: 1
description: System architecture and tech stack overview.
---

## System Architecture

The game uses a **client-server hybrid** model with authoritative server logic and client-side prediction.

### Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Game Engine | Unity 2022 LTS | C# scripting |
| Networking | Mirror | Server-authoritative |
| Backend | Node.js + Redis | Session management |
| Database | PostgreSQL | Player data, world state |
| Build | GitHub Actions | CI/CD pipeline |

### High-Level Architecture

- **Unity Client** ↔ **Game Server** (WebSocket)
- **Game Server** → **Redis Cache** (session state)
- **Game Server** → **PostgreSQL** (persistent data)
- **Game Server** → **Analytics Pipeline** (events)
- **Unity Client** → **Asset CDN** (HTTP)

## Code Organization

```
Assets/
├── Scripts/
│   ├── Core/           # Singletons, managers
│   ├── Entities/       # Player, NPC, Item
│   ├── Networking/     # Mirror components
│   ├── UI/             # Canvas controllers
│   └── Utils/          # Extensions, helpers
├── Prefabs/
├── Scenes/
└── Resources/
```

### Naming Conventions

- **Classes**: PascalCase (`PlayerController`)
- **Methods**: PascalCase (`GetHealth()`)
- **Private fields**: `_camelCase` (`_currentHealth`)
- **Constants**: UPPER_SNAKE (`MAX_PLAYERS`)

```csharp
public class PlayerController : NetworkBehaviour
{
    [SyncVar] private int _currentHealth = 100;
    
    public const int MAX_HEALTH = 100;
    
    [Server]
    public void TakeDamage(int amount)
    {
        _currentHealth = Mathf.Max(0, _currentHealth - amount);
        
        if (_currentHealth <= 0)
        {
            RpcOnDeath();
        }
    }
    
    [ClientRpc]
    private void RpcOnDeath()
    {
        // Play death animation on all clients
        GetComponent<Animator>().SetTrigger("Death");
    }
}
```

> [!DANGER]
> Never modify `SyncVar` fields on the client. Always use `[Command]` methods to request changes from the server.

