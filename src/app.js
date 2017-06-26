
import { waypoint } from 'waypoints'
import { sticky } from 'sticky'

var heading = $('h1')

heading.waypoint(function(){
  console.log("waypoints works")
})