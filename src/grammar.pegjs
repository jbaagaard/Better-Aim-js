Map = Sequential

Sequential
  = head:Node _ '\n' _ tail:Sequential { return [head, ...tail] }
  / head:Node { return [head] }

Node
	= Repeat / Spawn / Parallel

Parallel
	= 'in parallel' _ '\n'_ parallelBody:NodeChain {return {type:"parallel", parallelBody}}


 Spawn
  = 'spawn' _ target:Target _ options:OptionChain _ 'at' _ position:Position { return { target, options, position } }
  / 'spawn' _ target:Target _ 'at' _ position:Position { return { target, position } }

OptionChain
  = head:HasOptions _ 'and' _ tail:OptionChain { return [head, ...tail] }
  / head:HasOptions { return [head] }

Indented = '  ' spawn:Spawn

Repeat
	=  'repeat' __ amount:Integer _ 'times' _'\n'_ repeatBody:NodeChain {return {type:"repeat",amount, repeatBody}}

NodeChain
	=  head:Node _'\n'_ tail:NodeChain {return [head, ...tail]}
    /  head:Node _'\n'_ {return [head]}

HasOptions
  = 'with' _ option:Option { return option }
  / 'as' _ option:Option { return option }

Target = 'bullseye' / 'box' / 'balloon'

Position = '('_ x:Integer _ ',' _ y:Integer _ ')' { return { x, y } }

Option = SizeOption / ObjectiveOption / PositionOption

ObjectiveOption = 'objective' { return { type:'objective' } }
SizeOption = 'size' _ px:Integer { return { type:'size', px } }
PositionOption = 'delay' _ delay:Integer {	return { type:'delay', delay }}

Integer = [0-9]+ { return parseInt(text()) }

_ "optional space" = [ ]*
__ "space" = [ ]+