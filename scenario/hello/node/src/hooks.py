from pathlib import Path

def MOUNT(node_key: str) -> None:
    name = node_key.split('.')[-1]
    resource_space = Path.cwd() / 'resources' / 'hello'
    if not resource_space.exists():
        resource_space.parent.mkdir(parents=True, exist_ok=True)

def UNMOUNT(node_key: str) -> None:
    name = node_key.split('.')[-1]
    resource_space = Path.cwd() / 'resources' / 'hello'
    if resource_space.exists():
        resource_space.unlink()
        
    # Remove the directory if empty
    parent_dir = resource_space.parent
    if not any(parent_dir.iterdir()):
        parent_dir.rmdir()

def PARAM_CONVERTER(node_key: str, params: dict | None) -> dict | None:
    """Convert parameters to suitable format and value for the node."""
    resource_space = Path.cwd() / 'resources' / 'hello'
    return {
        'resource_space': str(resource_space)
    }